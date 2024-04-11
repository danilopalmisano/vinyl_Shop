import mongoose from 'mongoose';
import { IUser, roleEnum } from '../validation/user.validation';
import { hashStuff } from '../utility/commonAuthFunction';
import { LoginSchema } from './login.model';

const userSchema = new mongoose.Schema<IUser>({
	username: {
		type: String,
	},
	login: {
		type: LoginSchema,
		ref: 'login',
	},
	role: {
		type: String,
		enum: roleEnum,
		default: 'user',
	},
});

userSchema.pre('save', async function (next) {
	const user = this; // Use 'this' to access the document being saved
	try {
		user.login.password = await hashStuff(user.login.password);
		next();
	} catch (error) {
		next(); // Pass on errors to error handling middleware
	}
});

export const User = mongoose.model('User', userSchema);
