import { Request, Response } from "express";
import { findProductById, getProducts } from "../services/product.service";

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

export const addProduct = async (req, res) => {};

export const updateProduct = async (req, res) => {};

export const deleteProduct = async (req, res) => {};
