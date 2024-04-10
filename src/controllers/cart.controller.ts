import { Response } from 'express';
import {
	getUserCart,
	addToUserCart,
	updateCart,
	removeItemFromUserCart,
	emptyUserCart,
} from '../services/cart.service';
import { ExtendedRequest } from '../middleware/authMiddleware';
import { ICart, ILineItem } from '../validation/cart.validation';

//round cart values
const roundCartValues = async (userId: string) => {
	const cart = await getUserCart(userId);
	if (cart) {
		cart.totalPrice = parseFloat(cart.totalPrice!.toFixed(2)); // Round to 2 decimal places
		cart.lines.forEach((line: any) => {
			line.subtotal = parseFloat(line.subtotal.toFixed(2)); // Round to 2 decimal places
		});
		return await updateCart(cart);
	}
	throw new Error('Cart not found');
};

//generate total price
const generateTotalPrice = async (userId: string) => {
	const cart = await getUserCart(userId);
	if (cart) {
		cart.totalPrice = cart.lines.reduce(
			(total, lineItem) => total + (lineItem.subtotal as number),
			0
		);
		return await updateCart(cart);
	}
	throw new Error('Cart not found');
};

//show User cart
export const getCart = async (req: ExtendedRequest, res: Response) => {
	try {
		const userById = req.user?._id;

		if (userById) {
			const userCart = await getUserCart(userById as string); //to implement later!

			res.status(200).json(userCart);
		} else {
			res.status(404).json({
				message: 'you need to be logged in to view your cart',
			});
		}
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};

//add product to a User cart
export const addProductToCart = async (req: ExtendedRequest, res: Response) => {
	try {
		const userId = req.user?._id as string;
		const productId = req.params.id;
		if (userId) {
			// Check for existing cart with the same user ID
			const existingCart = await getUserCart(userId);
			if (existingCart) {
				const lineIndex = existingCart.lines.findIndex(
					(line: ILineItem) => line.productId === productId
				);

				if (lineIndex !== -1) {
					existingCart.lines[lineIndex].quantity! += 1; // to double check later
				} else {
					existingCart.lines.push({ productId, quantity: 1 });
				}

				const updatedCart = await updateCart(existingCart);
				if (!updatedCart) {
					return res.status(500).json({
						message: 'Error updating cart',
					});
				}

				res.status(200).json({
					message: 'Product quantity updated in cart',
					cart: await getUserCart(userId),
				});
			} else {
				const newCart: ICart = {
					userId,
					lines: [{ productId, quantity: 1 }],
				};

				const createdCart = await addToUserCart(newCart);
				if (!createdCart) {
					return res.status(500).json({
						message: 'Error creating cart',
					});
				}

				res.status(200).json({
					message: 'Product added to cart',
					cart: await getUserCart(userId),
				});
			}
		}
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};

//remove product from a User cart
export const removeProductFromCart = async (
	req: ExtendedRequest,
	res: Response
) => {
	const productId = req.params.id;
	const userId = req.user?._id as string;
	try {
		const deletedItem = await removeItemFromUserCart(userId, productId);
		res.status(200).json({
			message: 'Item deleted',
			'deleted item': {
				productId: deletedItem?.productId,
				quantity: deletedItem?.quantity,
			},
		});
	} catch (error: any) {
		res.status(500).json({
			message: error.message,
		});
	}
};

//empty a User cart
export const emptyCart = async (req: ExtendedRequest, res: Response) => {
	try {
		const userId = req.user?._id as string;
		const cart = await emptyUserCart(userId); //to implement later!

		res.status(200).json({
			message: 'Cart emptied',
		});
	} catch (error) {
		res.status(404).json({ message: 'cart not found' });
	}
};
