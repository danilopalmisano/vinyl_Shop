import { Schema } from "mongoose";

export interface IUser {
	username: String;
	login: Schema.Types.ObjectId;
	wishlist: String;
	cart: Schema.Types.ObjectId;
}
