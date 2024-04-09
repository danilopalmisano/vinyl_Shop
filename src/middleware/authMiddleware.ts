import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

// Interface for request with decoded user information
export interface ExtendedRequest extends Request {
	user?: { _id: string };
}

export const authMiddleware = async (
	req: ExtendedRequest,
	res: Response,
	next: NextFunction,
) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res
			.status(401)
			.json({ message: "Unauthorized: Token not provided" });
	}

	try {
		const decoded = await authService.verifyToken(token);
		if (!decoded) {
			return res
				.status(401)
				.json({ message: "Unauthorized: Invalid token" });
		}

		if (decoded) {
			req.user = { _id: decoded.id } as ExtendedRequest["user"];
		}

		next();
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};
