import { Cart } from '../models/cart.model';
import { ICart } from '../validation/cart.validation';

//get UserCart
export const getUserCart = async (userId: string): Promise<ICart | null> => {
	return await Cart.findOne({ user: userId });
};

//add a product to a User cart
export const addToUserCart = async (
	userId: string,
	productId: string
): Promise<ICart | null> => {
	return await Cart.findOneAndUpdate(
		{ user: userId },
		{ $push: { 'lines.productId': productId } },
		{ new: true }
	);
};

//remove a product from a User cart
export const removeFromUserCart = async (
	userId: string,
	productId: string
): Promise<ICart | null> => {
	return await Cart.findOneAndUpdate(
		{ user: userId },
		{ $pull: { 'lines.productId': productId } },
		{ new: true }
	);
};

//empty a User cart
export const emptyUserCart = async (userId: string): Promise<ICart | null> => {
	return await Cart.findOneAndDelete({ user: userId });
};
