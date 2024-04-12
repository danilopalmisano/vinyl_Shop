import { Product } from "../models/product.model";
import { IOptionalProduct, IProduct } from '../validation/product.validation';

//show Products
export const getProducts = async (
	skip: number,
	limit: number,
): Promise<IProduct[]> => {
	return await Product.find().skip(skip).limit(limit);
};

//find Product by id
export const findProductById = async (
	_id: string,
): Promise<IProduct | null> => {
	return await Product.findById(_id);
};

//add Product (by Admin)
export const createProduct = async (product: IProduct): Promise<IProduct> => {
	return await Product.create(product);
};

//update Product (by Admin)
export const upProduct = async (
	_id: string,
	product: IOptionalProduct,
): Promise<Partial<IProduct | null>> => {
	return await Product.findByIdAndUpdate(_id, product, { new: true });
};

//delete Product (by Admin)
export const delProduct = async (id: string): Promise<IProduct | null> => {
	return await Product.findByIdAndDelete(id);
};

// Subtracts the stock quantity of a product by its ID
export const subProductStockQuantityHandler = async (
	productId: string,
	delta: number,
): Promise<IProduct | null> => {
	return await Product.findByIdAndUpdate(
		productId,
		{ $inc: { stockQuantity: -delta } },
		{ new: true },
	);
};

// adds to the stock quantity of a product by its ID
export const addProductStockQuantityHandler = async (
	productId: string,
	delta: number,
): Promise<IProduct | null> => {
	return await Product.findByIdAndUpdate(
		productId,
		{ $inc: { stockQuantity: delta } },
		{ new: true },
	);
};

//Updates the stock status of a product based on its current stock quantity
export const setProductStockStatusHandler = async (
	productId: string,
	status: string,
): Promise<IProduct | null> => {
	return await Product.findOneAndUpdate(
		{ _id: productId },
		{ $set: { stockStatus: status } },
		{ new: true },
	);
};