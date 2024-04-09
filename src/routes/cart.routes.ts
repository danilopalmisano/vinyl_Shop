import { Router } from 'express';
import {
	addProductToCart,
	emptyCart,
	getCart,
	removeProductFromCart,
} from '../controllers/cart.controller';
import { authMiddleware } from '../middleware/authMiddleware';

export const router = Router();

//get User cart
router.get('/', authMiddleware, getCart);
//add a product to a User cart
router.post('/add/:id', authMiddleware, addProductToCart);
//remove a product from a User cart
router.delete('/remove/:id', authMiddleware, removeProductFromCart);
//empty a User cart
router.delete('/clear', authMiddleware, emptyCart);
