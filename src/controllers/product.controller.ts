import { Request, Response } from "express";
import {
	createProduct,
	delProduct,
	findProductById,
	getProducts,
	upProduct,
} from "../services/product.service";

//retrieve all products
export const showProducts = async (req: Request, res: Response) => {
	try {
		const products = await getProducts();
		res.status(200).json(products);
	} catch (error) {
		res.status(404).json({ message: "no product yet" });
	}
};

//retrieve product by id
export const showSpecificProduct = async (req: Request, res: Response) => {
	try {
		const productId = req.params.id;
		if (!productId) {
			res.status(400).json({ message: "missing product id" });
		}
		const product = await findProductById(productId);
		if (product) {
			res.status(200).json(product);
		} else {
			throw new Error("product not found");
		}
	} catch (error) {
		return res.status(404).json({ message: "product not found" });
	}
};

//permit to Admin to add a new product
export const addProduct = async (req: Request, res: Response) => {
	try {
		const product = await createProduct(req.body);
		res.status(201).json(product);
	} catch (error) {
		return res.status(400).json({ message: "bad request" });
	}
};

//permit to Admin to update an existing product
export const updateProduct = async (req: Request, res: Response) => {
	try {
		const _id = req.params.id;
		const product = await upProduct(_id, req.body);
		res.status(200).json({
			message: "product updated successfully",
			product,
		});
	} catch (error) {
		return res.status(404).json({ message: "product not found" });
	}
};

//permit to Admin to delete a product
export const deleteProduct = async (req: Request, res: Response) => {
	try {
		const product = await delProduct(req.params.id);
		res.status(200).json({ message: "product deleted successfully" });
	} catch (error) {
		return res.status(404).json({ message: "product not found" });
	}
};
