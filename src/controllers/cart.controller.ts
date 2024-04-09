import { Request, Response } from "express";
import {
	addToUserCart,
	emptyUserCart,
	getUserCart,
	removeFromUserCart,
} from "../services/cart.service";
import { ExtendedRequest } from '../middleware/authMiddleware';
import { ICart } from '../validation/cart.validation';

//show User cart
export const getCart = async (req: ExtendedRequest, res: Response) => {
	try {
		const userById = req.user?._id;
		console.log(userById);
		if (userById) {
			const userCart = await getUserCart(userById as string); //to implement later!
			console.log(userCart);
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
		const userId = req.user?._id;
		console.log(userId);
		const productId = req.params.id;
		if (userId) {
			// Create a new cart with the provided items
			const newCart: ICart = {
				userId,
				lines: [{ productId: productId, quantity: 1 }],
			};
			console.log({ newCart: newCart.lines });
			const newsaroCart = {
				userId: 'user_id_here',
				lines: [
					{
						productId: 'product_id_here',
						quantity: 1,
					},
				],
			};
			const createCart = await addToUserCart(newsaroCart);
			console.log({ createCart: createCart });
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
export const removeProductFromCart = async (req: Request, res: Response) => {
	try {
		const cart = await removeFromUserCart(
			req.params.id,
			req.params.productId
		); //to implement later!
		res.status(200).json(cart);
	} catch (error) {
		res.status(404).json({ message: "cart not found" });
	}
};

//empty a User cart
export const emptyCart = async (req: Request, res: Response) => {
	try {
		const cart = await emptyUserCart(req.params.id); //to implement later!
		res.status(200).json(cart);
	} catch (error) {
		res.status(404).json({ message: "cart not found" });
	}
};
