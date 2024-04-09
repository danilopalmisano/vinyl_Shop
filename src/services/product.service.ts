import { Product } from "../models/product.model";
import { IProduct } from "../validation/product.validation";

//show Products
export const getProducts = async (): Promise<IProduct[]> => {
	return await Product.find();
};

//find Product by id
export const findProductById = async (id: string): Promise<IProduct | null> => {
	return await Product.findById(id);
};

//add Product (by Admin)
export const createProduct = async (product: IProduct): Promise<IProduct> => {
	return await Product.create(product);
};

//update Product (by Admin)
export const upProduct = async (
	_id: string,
	product: IProduct,
): Promise<IProduct | null> => {
	return await Product.findByIdAndUpdate(_id, product, { new: true });
};

//delete Product (by Admin)
export const delProduct = async (id: string): Promise<IProduct | null> => {
	return await Product.findByIdAndDelete(id);
};
