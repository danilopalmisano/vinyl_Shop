import mongoose from 'mongoose';
import { Cart } from '../models/cart.model';
import { ICart } from '../validation/cart.validation';

//get UserCart
export const getUserCart = async (userId: string): Promise<ICart | null> => {
	return await Cart.findOne({ userId });
};

//add a product to a User cart
export const addToUserCart = async (cartData: ICart): Promise<ICart> => {
	return await Cart.create(cartData);
};

//empty a User cart
export const emptyUserCart = async (userId: string): Promise<ICart | null> => {
	return await Cart.findOneAndDelete({ userId });
};

//remove a product from a User cart
export const removeFromUserCart = async (
	userId: string,
	productId: string
): Promise<ICart | null> => {
	return await Cart.findOneAndUpdate(
		{ userId },
		{ $pull: { lines: { productId } } },
		{ new: true }
	);
};
