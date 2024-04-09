import { Request, Response } from "express";
import { getUserCart } from "../services/cart.service";
import {
	findOrder,
	getOrders,
	orderStatusHandler,
} from "../services/order.service";
import { ExtendedRequest } from '../middleware/authMiddleware';

//show all orders
export const showOrders = async (req: Request, res: Response) => {
	try {
		const order = await getOrders();
		res.status(200).json(order);
	} catch (error) {
		res.status(400).json(error);
	}
};

//show order by id
export const getOrderById = async (req: Request, res: Response) => {
	try {
		const orderId = req.body?.orderId;
		if (!orderId) {
			return res.status(400).json({ message: "Missing order ID" });
		}
		const foundOrder = await findOrder(orderId);
		if (foundOrder) {
			return res.status(200).json(foundOrder);
		} else {
			throw new Error("Order not found");
		}
	} catch (error) {
		return res.status(404).json({ message: "Order not found" });
	}
};

//create new order
export const createOrder = async (req: ExtendedRequest, res: Response) => {
	try {
		if (req.user?._id) {
			const cartFromUserId = await getUserCart(req.user?._id.toString());
			const orderData = {
				...req.body,
				cart: cartFromUserId,
			};
			res.status(200).json(orderData);
		}
		//to implement if the cart is empty
		//to implement if the cart is existent
	} catch (error) {
		res.status(400).json(error);
	}
};

//update order status
export const updateOrderStatus = async (req: Request, res: Response) => {
	try {
		const orderStatus = await orderStatusHandler(
			req.params.id,
			"delivered"
		);
		res.status(200).json(orderStatus);
	} catch (error) {
		res.status(400).json(error);
	}
};

//delete order status
export const deletedOrderStatus = async (req: Request, res: Response) => {
	try {
		const orderStatus = await orderStatusHandler(
			req.params.id,
			"cancelled"
		);
		res.status(200).json(orderStatus);
	} catch (error) {
		res.status(400).json(error);
	}
};
