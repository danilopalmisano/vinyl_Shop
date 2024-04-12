import { Order } from "../models/order.model";
import { Product } from "../models/product.model";
import { ICart, ILineItem } from "../validation/cart.validation";
import { IOrder } from "../validation/order.validation";
import {
	findProductById,
	setProductStockStatusHandler,
	subProductStockQuantityHandler,
} from "./product.service";

export const getOrders = async (): Promise<IOrder[]> => {
	return await Order.find();
};

export const findOrder = async (id: string): Promise<IOrder | null> => {
	return await Order.findById(id);
};

// Fetches order from cart id from the database
export const getOrdersByCartIdHandler = async (
	_id: string,
): Promise<IOrder | null> => {
	return await Order.findOne({ "cart._id": _id });
};

// Creates a new order in the database
export const createOrderHandler = async (data: IOrder): Promise<IOrder> => {
	return await Order.create(data);
};

//calculate total price
export const calculateTotalCheckDataFromDB = async (
	productsInCart: ILineItem[],
): Promise<number | Error> => {
	let totalPrice = 0;
	for (const product of productsInCart) {
		const productFromServer = await Product.findById(product.productId);
		if (!productFromServer) {
			return new Error(
				`Product ${product.productId} not found in server`,
			);
		}
		if (productFromServer) {
			if (product.price !== productFromServer.price) {
				return new Error(
					`Price mismatch for ${productFromServer.name}. Double checking...`,
				);
			}
			totalPrice += productFromServer.price * product.quantity;
		}
	}
	return totalPrice;
};

export const orderStatusHandler = async (
	orderId: string,
	status: string,
): Promise<IOrder | null> => {
	return await Order.findOneAndUpdate(
		{ _id: orderId },
		{ $set: { status: status } },
		{ new: true },
	);
};

export const checkProductStock = async (
	cartFromUserId: ICart,
): Promise<Boolean | Error> => {
	for (const line of cartFromUserId?.lines || []) {
		const product = await findProductById(line.productId);
		if (product?.stockQuantity! < line.quantity) {
			return new Error(
				`Product with id ${line.productId} is either out of stock or we don' t have enough please check stock quantity or contact us for more information on large orders`,
			);
		}
	}
	return true;
};
export const updateProductStock = async (
	cartFromUserId: ICart,
	status: string,
): Promise<Boolean | Error> => {
	for (const line of cartFromUserId?.lines || []) {
		const product = await findProductById(line.productId);
		if (product?.stockQuantity! <= 0) {
			await setProductStockStatusHandler(line.productId, status);
		}
	}
	return true;
};

export const updateStockQuantityDb = async (
	cartFromUserId: ICart,
): Promise<Boolean | Error> => {
	for (const line of cartFromUserId?.lines || []) {
		await subProductStockQuantityHandler(line.productId, line.quantity);
		if (!subProductStockQuantityHandler(line.productId, line.quantity)) {
			throw new Error();
			return false;
		}
	}
	return true;
};