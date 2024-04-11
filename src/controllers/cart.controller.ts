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
import { findProductById } from '../services/product.service';

//round cart values -->  function that round to 2 decimal places
const roundCartValues = async (userId: string) => {
	const cart = await getUserCart(userId);
	if (cart) {
		cart.totalPrice = parseFloat(cart.totalPrice!.toFixed(2));
		cart.lines.forEach((line: any) => {
			line.subtotal = parseFloat(line.subtotal.toFixed(2));
		});
		return await updateCart(cart);
	}
	throw new Error('Cart not found');
};

//generate subtotal
const generateSubtotal = async (userId: string) => {
	const cart = await getUserCart(userId);
	if (cart) {
		cart.lines.forEach((line: any) => {
			line.subtotal = line.quantity * line.price;
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
		const userById = req.user?._id as string;

		const userCart = await getUserCart(userById);
		if (userCart === null) {
			return res.status(404).json({ message: 'Cart not found' });
		}
		res.status(200).json(userCart);
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};

//add product to a User cart
export const addProductToCart = async (req: ExtendedRequest, res: Response) => {
	try {
		console.log('🚀 addProductToCart controller triggered');
		const userId = req.user?._id as string;
		const productId = req.params.id;

		console.log('userId:', userId);
		console.log('productId:', productId);

		// Check if product exists
		const existingProduct = await findProductById(productId);
		console.log('existingProduct:', existingProduct);
		// destructure dbProduct for price
		const dbProductPrice = existingProduct?.price as number;
		const dbProductId = existingProduct?._id?.toString();
		if (dbProductId !== productId) {
			console.log('Product not found');
			return res.status(404).json({
				message: 'Product not found',
			});
		}

		// Check for existing cart with the same user ID
		const existingCart = await getUserCart(userId);
		console.log('existingCart:', existingCart);

		if (existingCart) {
			//lineIndex indicates the position of the product in the lines array of the cart
			const lineIndex = existingCart.lines.findIndex(
				(line: ILineItem) => line.productId === productId //this is the productId at 71 line
			);

			console.log('lineIndex:', lineIndex);

			if (lineIndex !== -1) {
				existingCart.lines[lineIndex].quantity += 1; // Increment quantity by 1 if product already exists
				console.log('Product already exists, incrementing quantity');
			} else {
				existingCart.lines.push({
					productId: dbProductId,
					price: dbProductPrice,
					quantity: 1,
				}); // if product doesn't exist in cart, add it to same cart
				console.log('Product not in cart, adding it');
			}

			const upCart = await updateCart(existingCart);
			console.log(upCart);

			if (!upCart) {
				console.log('Error updating cart');
				return res.status(500).json({
					message: 'Error updating cart',
				});
			}
			await generateSubtotal(userId);
			await generateTotalPrice(userId);
			await roundCartValues(userId);
			res.status(200).json({
				message: 'Product quantity updated in cart',
				cart: await getUserCart(userId),
			});
		} else {
			//if productCart doesn't alredy exist, create a new cart
			const newCart: ICart = {
				userId,
				lines: [
					{
						productId: dbProductId,
						price: dbProductPrice,
						quantity: 1,
					},
				],
			};

			console.log('newCart:', newCart);

			const createdCart = await addToUserCart(newCart);
			if (!createdCart) {
				console.log('Error creating cart');
				return res.status(500).json({
					message: 'Error creating cart',
				});
			}
			await generateSubtotal(userId);
			await generateTotalPrice(userId);
			await roundCartValues(userId);
			res.status(200).json({
				message: 'Product added to cart',
				cart: await getUserCart(userId),
			});
		}
	} catch (error) {
		console.log(error);
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
		await generateSubtotal(userId);
		await generateTotalPrice(userId);
		await roundCartValues(userId);
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
