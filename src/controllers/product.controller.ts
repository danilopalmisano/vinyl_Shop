import { Request, Response } from "express";
import {
	createProduct,
	delProduct,
	findProductById,
	getProducts,
	upProduct,
} from "../services/product.service";
import {
	IFormattedProduct,
	ZOptionalProductSchema,
	ZProductSchema,
} from "../validation/product.validation";
import { fromZodError } from "zod-validation-error";
import { Product } from "../models/product.model";
import mongoose from "mongoose";

//retrieve all products
export const showProducts = async (req: Request, res: Response) => {
	try {
		const products = await getProducts();
		const formattedProducts: IFormattedProduct[] = products.map(
			(product) => {
				return {
					_id: product._id,
					name: product.name,
					description: product.description,
					price: product.price,
					images: product.images,
					stockQuantity: product.stockQuantity,
					stockStatus: product.stockStatus,
					category: product.category,
				};
			},
		);
		res.status(200).json(formattedProducts);
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
			const formattedProduct: IFormattedProduct = {
				_id: product._id,
				name: product.name,
				description: product.description,
				price: product.price,
				images: product.images,
				stockQuantity: product.stockQuantity,
				stockStatus: product.stockStatus,
				category: product.category,
			};
			res.status(200).json(formattedProduct);
		} else {
			throw new Error("product not found");
		}
	} catch (error) {
		return res.status(404).json({ message: "product not found" });
	}
};

//allow Admin to add a new product
export const addProduct = async (req: Request, res: Response) => {
	try {
		const body = req.body;
		const validationError = ZProductSchema.safeParse(body);
		if (!validationError.success) {
			return res
				.status(400)
				.json(fromZodError(validationError.error).message);
		}
		//check if product already exists by name
		const existingProduct = await Product.findOne({
			name: validationError.data.name,
		});
		if (existingProduct) {
			return res.status(400).json({
				message: `Product with name '${validationError.data.name}' already exists.`,
			});
		}
		const product = await createProduct(validationError.data);
		const formattedProduct: IFormattedProduct = {
			_id: product._id,
			name: product.name,
			description: product.description,
			price: product.price,
			images: product.images,
			stockQuantity: product.stockQuantity,
			stockStatus: product.stockStatus,
			category: product.category,
		};
		res.status(201).json(formattedProduct);
	} catch (error) {
		return res.status(500).json({ message: "internal server error" });
	}
};

//allow Admin to update an existing product
export const updateProduct = async (req: Request, res: Response) => {
	try {
		const _id = req.params.id;
		const body = req.body;
		const isValidId = mongoose.Types.ObjectId.isValid(_id);
		if (!isValidId)
			return res.status(400).json({
				message:
					"Product id is not valid, please provide a valid product id",
			});

		const validationError = ZOptionalProductSchema.safeParse(body);
		if (!validationError.success) {
			return res
				.status(400)
				.json(fromZodError(validationError.error).message);
		}
		await upProduct(_id, validationError.data);

		const product = await findProductById(_id);
		if (!product) {
			return res.status(404).json({
				message: "can not update a product that is not on the database",
			});
		}
		const formattedProduct: IFormattedProduct = {
			_id: product._id,
			name: product.name,
			description: product.description,
			price: product.price,
			images: product.images,
			stockQuantity: product.stockQuantity,
			stockStatus: product.stockStatus,
			category: product.category,
		};
		return res.status(200).json({
			message: "product updated successfully",
			formattedProduct,
		});
	} catch (error) {
		return res.status(500).json({ message: "internal server error" });
	}
};

//allow Admin to delete a product
export const deleteProduct = async (req: Request, res: Response) => {
	try {
		const _id = req.params.id;
		const isValidId = mongoose.Types.ObjectId.isValid(_id);
		if (!isValidId)
			return res.status(400).json({
				message:
					"Product id is not valid, please provide a valid product id",
			});
		const deletedProduct = await delProduct(_id);
		if (!deletedProduct) {
			return res.status(404).json({
				message: "can not delete a product that is not on the database",
			});
		}
		res.status(200).json({ message: "product deleted successfully" });
	} catch (error) {
		return res.status(500).json({ message: "internal server error" });
	}
};
