import * as bcrypt from "bcrypt";
import { env } from "./env";
import jwt from "jsonwebtoken";

export async function hashStuff(password: string | undefined): Promise<string> {
	if (!password) {
		throw new Error("password undefined");
	}
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
}

export const createAccessToken = (id: string, time: string) => {
	const secret = env.ACCESS_SECRET_TOKEN;
	if (!secret) {
		throw new Error("Missing environment variable JWT_SECRET");
	}
	return jwt.sign({ id }, secret /*{ expiresIn: time }*/);
};