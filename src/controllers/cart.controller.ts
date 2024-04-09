import { Request, Response } from "express";
import {
	addToUserCart,
	emptyUserCart,
	getUserCart,
	removeFromUserCart,
} from "../services/cart.service";

//show User cart
export const getCart = async (req: Request, res: Response) => {
	try {
		const cart = await getUserCart(req.params.id); //to implement later!
		res.status(200).json(cart);
	} catch (error) {
		res.status(404).json({ message: "cart not found" });
	}
};

//add product to a User cart
export const addProductToCart = async (req: Request, res: Response) => {
	try {
		const cart = await addToUserCart(req.params.id, req.params.productId); //to implement later!
		res.status(200).json(cart);
	} catch (error) {
		res.status(404).json({ message: "cart not found" });
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
