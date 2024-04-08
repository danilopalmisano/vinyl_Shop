import { Router } from 'express';
import {
	addProduct,
	deleteProduct,
	showProducts,
	showSpecificProduct,
	updateProduct,
} from '../controllers/product.controller';

export const router = Router();

//retrieve all products
router.get('/', showProducts);
//retrieve product by id
router.get('/:id', showSpecificProduct);
//permit to Admin to add a new product
router.post('/', addProduct);
//permit to Admin to update an existing product info
router.put('/:id', updateProduct);
//permit to Admin to delete a product
router.delete('/:id', deleteProduct);
