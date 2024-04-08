import mongoose from "mongoose";
import { IUser } from "../validation/user.validation";
import { hashStuff } from "../utility/commonAuthFunction";

const userSchema = new mongoose.Schema<IUser>({
	username: {
		type: String,
		required: true,
	},
	login: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "login",
		required: true,
	},

	wishlist: {
		type: String,
		required: false,
	},
	cart: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "cart",
		required: true,
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
