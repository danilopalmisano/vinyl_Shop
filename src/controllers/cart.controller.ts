import { Request, Response } from "express";
import {
	addToUserCart,
	emptyUserCart,
	getUserCart,
	removeFromUserCart,
} from '../services/cart.service';
import { ExtendedRequest } from '../middleware/authMiddleware';
import { ICart } from '../validation/cart.validation';

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
			// Create a new cart with the provided items
			const newCart: ICart = {
				userId,
				lines: [{ productId: productId, quantity: 1 }],
			};

			const createCart = await addToUserCart(newCart);
			if (!createCart) {
				return res.status(500).json({
					message: 'Error adding items to cart',
				});
			}
			res.status(200).json({
				message: 'Items added to cart',
				cart: await getUserCart(userId),
			});
		}
	} catch (error) {
		res.status(404).json({ message: 'cart not found' });
	}
};

//remove product from a User cart
export const removeProductFromCart = async (
	req: ExtendedRequest,
	res: Response
) => {
	try {
		const userId = req.user?._id as string;
		const productId = req.params.productId;
		const updatedCart = await removeFromUserCart(userId, productId);
		if (updatedCart) {
			res.json({
				message: 'Product removed from cart',
				cart: updatedCart,
			});
		} else {
			res.status(404).json({ message: 'Cart not found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error' });
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
