import bcrypt from "bcrypt";
import { Request, Response } from "express";
import {
	createUser,
	findUserByEmail,
	findUserById,
	updateUserLoggedInStatus,
} from "../services/auth.service";
import {
	IFormattedUser,
	IUser,
	ZLoginSchema,
	ZOptionalUser,
	ZUserSchema,
} from '../validation/user.validation';
import { fromZodError } from 'zod-validation-error';
import { createAccessToken } from '../utility/commonAuthFunction';
import { ExtendedRequest } from '../middleware/authMiddleware';

// create User
export const register = async (req: Request, res: Response) => {
	try {
		//parsing invalid req.body
		const validationError = ZUserSchema.safeParse(req.body);

		if (!validationError.success) {
			return res
				.status(400)
				.json(fromZodError(validationError.error).message);
		}

		const user = validationError.data;

		const userByEmail = await findUserByEmail(
			validationError.data.login.email
		);
		if (userByEmail) {
			return res.status(400).json({ message: 'Email already exists!' });
		}

		// will be implemented later fetching allowed email from DB
		const adminValidName = ['admin@vinylshop.com'];
		const newMail = user.login.email as string;
		if (adminValidName.includes(newMail)) {
			user.role = 'admin';
		}
		if (
			newMail.includes("@vinylshop.com") &&
			newMail.split("@")[0] !== "admin"
		) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const newUser: IUser = {
			username: user.username,
			login: {
				email: user.login.email,
				password: user.login.password,
				loggedIn: false,
			},
			role: user.role,
		};
		const userCreated = await createUser(newUser);
		res.status(200).json({
			user: {
				username: userCreated.username,
				email: userCreated.login?.email,
			},
		});
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
};

//login User
export const logIn = async (req: Request, res: Response) => {
	try {
		const validationError = ZLoginSchema.safeParse(
			req.body as {
				email: string;
				password: string;
			}
		);
		if (!validationError.success) {
			return res
				.status(400)
				.json(fromZodError(validationError.error).message);
		}
		const user = validationError.data as {
			email: string;
			password: string;
		};
		const userByEmail = await findUserByEmail(user.email);
		if (!userByEmail) {
			return res
				.status(400)
				.json({ messageAt: 'Incorrect email or password' });
		}

		const validPassword = await bcrypt.compare(
			user.password,
			userByEmail.login.password!
		);

		if (!validPassword) {
			return res
				.status(400)
				.json({ messagePW: 'Incorrect email or password' });
		}

		const id = userByEmail._id?.toString();

		if (id) {
			const accessToken = createAccessToken(id, '30s');
			updateUserLoggedInStatus(id, true);

			return res.status(200).json({
				message: 'You are logged in!',
				accessToken: accessToken,
			});
		}
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

//logout User
export const logOut = async (req: ExtendedRequest, res: Response) => {
	const validationError = ZOptionalUser.safeParse({
		username: req.params.username,
	});
	if (!validationError.success) {
		return res
			.status(400)
			.json(fromZodError(validationError.error).message);
	}
	try {
		const id = req.user?._id;

		if (id) {
			const loggedIn = await findUserByEmail(id);
			if (loggedIn?.login.loggedIn === false) {
				return res.status(400).json({ message: 'Already logged out' });
			}
			await updateUserLoggedInStatus(id, false);
		}

		return res.status(200).json({ message: 'Successfully logged out' });
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
};

// show registered account
export const authInfo = async (req: ExtendedRequest, res: Response) => {
	try {
		const id = req.user?._id;
		if (id) {
			const account = await findUserById(id);
			if (!account) {
				return res.status(404).json('account not found');
			}
			const showAccount: IFormattedUser = {
				username: account.username,
				email: account.login.email as string,
				role: account.role,
				loggedIn: account.login.loggedIn as boolean,
			};
			return res.status(200).json(showAccount);
		}
	} catch (error) {
		return res.status(500).json({ message: 'internal server error' });
	}
};
