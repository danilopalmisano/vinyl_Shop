import { Cart } from '../models/cart.model';
import { ICart, ILineItem } from '../validation/cart.validation';

//get UserCart
export const getUserCart = async (userId: string): Promise<ICart | null> => {
	return await Cart.findOne({ userId });
};

//add a product to a User cart
export const addToUserCart = async (cartData: ICart): Promise<ICart> => {
	return await Cart.create(cartData);
};

//updateCart
export const updateCart = async (cartData: ICart): Promise<ICart | null> => {
	return await Cart.findOneAndUpdate(cartData);
};

//remove a product from a User cart
export const removeItemFromUserCart = async (
	userId: string,
	productId: string
): Promise<ILineItem | null> => {
	const cart = await Cart.findOne({ userId });
	if (!cart) {
		throw new Error('Cart not found');
	}
	const deletedItem = cart.lines.find(
		(lineItem) => lineItem.productId === productId
	);
	if (!deletedItem) {
		throw new Error('Item not found');
	}
	cart.lines = cart.lines.filter(
		(lineItem) => lineItem.productId !== productId
	);
	await cart.save();
	return deletedItem;
};

//empty a User cart
export const emptyUserCart = async (userId: string): Promise<ICart | null> => {
	return await Cart.findOneAndDelete({ userId });
};
