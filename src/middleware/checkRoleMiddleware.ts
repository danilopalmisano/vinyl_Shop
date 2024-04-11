import { NextFunction, Response } from 'express';
import { ExtendedRequest } from './authMiddleware';
import { findUserByEmail, findUserById } from '../services/auth.service';

export const checkRoleMiddleware =
	(allowedRoles: string[]) =>
	async (req: ExtendedRequest, res: Response, next: NextFunction) => {
		const userId = req.user?._id as string;
		const userEmail = req.body as { email: string };
		try {
			const user =
				(await findUserById(userId)) ||
				(await findUserByEmail(userEmail.email));
			if (!user) {
				return res
					.status(401)
					.json({ message: 'Unauthorized: User not found' });
			}

			if (!allowedRoles.includes(user.role)) {
				return res
					.status(403)
					.json({ message: 'Forbidden: Insufficient permissions' });
			}

			// User is authorized, proceed with the request
			next();
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Internal Server Error' });
		}
	};
