import mongoose from "mongoose";
import { ILogin } from "../validation/user.validation";

const LoginSchema = new mongoose.Schema<ILogin>(
	{
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		loggedIn: {
			type: Boolean,
			required: true,
		},
	},
	{ timestamps: true }
);

export const Login = mongoose.model("Login", LoginSchema);
