import mongoose from "mongoose";
import { ILogin } from "../validation/user.validation";

export const LoginSchema = new mongoose.Schema<ILogin>(
	{
		email: {
			type: String,
		},
		password: {
			type: String,
		},
		loggedIn: {
			type: Boolean,
		},
	},
	{ timestamps: true }
);

export const Login = mongoose.model("Login", LoginSchema);
