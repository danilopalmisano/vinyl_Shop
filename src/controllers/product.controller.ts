import { Request, Response } from "express";
import {
	createProduct,
	delProduct,
	findProductById,
	getProducts,
	upProduct,
} from "../services/product.service";

export const showProducts = async (req: Request, res: Response) => {
	try {
		const products = await getProducts();
		res.status(200).json(products);
	} catch (error) {
		res.status(200).json({ message: "no product yet" });
	}
};

export const showSpecificProduct = async (req: Request, res: Response) => {
	const product = await findProductById(req.params.id);
	res.status(200).json(product);
};

export const addProduct = async (req: Request, res: Response) => {
	const product = await createProduct(req.body);
	res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
	const _id = req.params.id;
	const product = await upProduct(_id, req.body);
	await res.status(200).json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
	const product = await delProduct(req.params.id);
	res.status(200).json({ message: "product deleted successfully" });
};
