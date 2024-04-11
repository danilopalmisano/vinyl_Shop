import { Order } from "../models/order.model";
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
