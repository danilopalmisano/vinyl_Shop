import { User } from "../models/user.model";
import { IUser } from "../validation/user.validation";

//* createUser
export const createUser = async (user: IUser): Promise<IUser> => {
	return await User.create(user);
};

//* findUserById
export const findUserById = async (id: string): Promise<IUser | null> => {
	return await User.findById(id);
};

//* findUserByEmail
export const findUserByEmail = async (email: string): Promise<IUser | null> => {
	return await User.findOne({ "login.email": email });
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
