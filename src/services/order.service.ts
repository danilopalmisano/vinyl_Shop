import { Order } from "../models/order.model";
import { Product } from "../models/product.model";
import { ILineItem } from "../validation/cart.validation";
import { IOrder } from "../validation/order.validation";

export const getOrders = async (): Promise<IOrder[]> => {
	return await Order.find();
};

export const findOrder = async (id: string): Promise<IOrder | null> => {
	return await Order.findById(id);
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
	status: string
): Promise<IOrder | null> => {
	return await Order.findOneAndUpdate(
		{ _id: orderId },
		{ $set: { status: status } },
		{ new: true }
	);
};
