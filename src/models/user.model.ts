import mongoose from "mongoose";
import { ILogin, IUser, roleEnum } from "../validation/user.validation";
import { hashStuff } from "../utility/commonAuthFunction";

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
	{ timestamps: true },
);

export const Login = mongoose.model("Login", LoginSchema);

const userSchema = new mongoose.Schema<IUser>({
	username: {
		type: String,
		required: true,
	},
	login: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Login",
		required: true,
	},
	/*cart: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "cart",
		required: true,
	},*/
	orders: {
		type: String,
		required: false,
	},
	guestId: {
		type: String,
		required: false,
	},
	role: {
		type: String,
		enum: roleEnum,
		default: "user",
	},
});

userSchema.pre("save", async function (next) {
	const user = this; // Use 'this' to access the document being saved
	try {
		user.login.password = await hashStuff(user.login.password);
		next();
	} catch (error) {
		next(); // Pass on errors to error handling middleware
	}
});

export const User = mongoose.model("User", userSchema);
