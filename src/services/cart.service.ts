import { Cart } from '../models/cart.model';
import { ICart } from '../validation/cart.validation';

//get UserCart
export const getUserCart = async (userId: string): Promise<ICart | null> => {
	const cart = await Cart.findOne({ user: userId });
	return cart || null; // This returns an empty object if cart is null
};

//add a product to a User cart
export const addToUserCart = async (data: ICart): Promise<ICart> => {
	const saro = await Cart.create(data);
	console.log(saro);

	return saro;
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
