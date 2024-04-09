import { User } from "../models/user.model";
import { env } from "../utility/env";
import { IDecodedToken } from "../validation/decodedToken.validation";
import { IUser } from "../validation/user.validation";
import jwt, { JwtPayload } from "jsonwebtoken";

//* createUser

export const createUser = async (user: IUser): Promise<IUser> => {
	return await User.create(user); 
};
//* findUserById
export const findUserById = async (id: string): Promise<IUser | null> => {
	return await User.findById(id);
};

//* findUserByEmail
export const findUserByEmail = async (
	email: string | undefined,
): Promise<IUser | null> => {
	try {
		if (!email) {
			throw new Error("Email is undefined");
		}
		return await User.findOne({ "login.email": email });
	} catch (err) {
		console.error("Error finding user by email:", err);
		return null;
	}
};

//* updateUserLoggedInStatus
export const updateUserLoggedInStatus = async (
	id: string,
	status: boolean,
): Promise<Partial<IUser | null>> => {
	return await User.findOneAndUpdate(
		{ _id: id },
		{ "login.loggedIn": status },
		{ new: true },
	);
};

export class AuthService {
	private decodedToken?: IDecodedToken;
	async verifyToken(token: string): Promise<IDecodedToken | null> {
		try {
			const decoded = jwt.verify(
				token,
				env.ACCESS_SECRET_TOKEN,
			) as JwtPayload;
			this.decodedToken = {
				id: decoded.id,
			};
			return this.decodedToken;
		} catch (error) {
			console.error("Error verifying token:", error);
			return null;
		}
	}

	getDecodedToken(): IDecodedToken | undefined {
		return this.decodedToken;
	}
}