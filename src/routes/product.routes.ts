import { Router } from 'express';
import {
	addProduct,
	deleteProduct,
	showProducts,
	showSpecificProduct,
	updateProduct,
} from '../controllers/product.controller';
import { checkRoleMiddleware } from '../middleware/checkRoleMiddleware';

export const router = Router();

router.get('/', showProducts);
router.get('/:id', showSpecificProduct);
router.post('/', checkRoleMiddleware(['admin']), addProduct);
router.put('/:id', checkRoleMiddleware(['admin']), updateProduct);
router.delete('/:id', checkRoleMiddleware(['admin']), deleteProduct);
