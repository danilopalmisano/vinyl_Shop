import { Router } from 'express';
import {
	addProductToCart,
	emptyCart,
	getCart,
	removeProductFromCart,
} from '../controllers/cart.controller';

export const router = Router();

//get User cart
router.get('/', getCart);
//add a product to a User cart
router.post('/add/:id', addProductToCart);
//remove a product from a User cart
router.delete('/remove/:id', removeProductFromCart);
//empty a User cart
router.delete('/clear', emptyCart);
