import { Request, Response } from "express";
import { getUserCart } from "../services/cart.service";
import {
	createOrderHandler,
	findOrder,
	getOrders,
	orderStatusHandler,
} from "../services/order.service";
import { ExtendedRequest } from "../middleware/authMiddleware";
import { IOrder, ZOrderSchema } from "../validation/order.validation";
import { fromZodError } from "zod-validation-error";
import { ICart } from "../validation/cart.validation";

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
		const orderId = req.params.id;
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
		const userId = req.user?._id as string;
		const body = req.body;
		if (userId && body) {
			const cartFromUserId = (await getUserCart(userId)) as ICart;
			if (!cartFromUserId) {
				return res.status(400).json({ message: "Cart not found" });
			}
			const validationError = ZOrderSchema.safeParse(body);
			if (!validationError.success) {
				return res
					.status(400)
					.json(fromZodError(validationError.error).message);
			}
			const validateBody = validationError.data.shippingAddress;
			const realPrice = 0; //function to calcultate real price from real price fetched from database
			const orderData: IOrder = {
				userId: userId,
				cart: cartFromUserId,
				shippingAddress: validateBody,
				totalPrice: realPrice,
			};
			const newOrder = await createOrderHandler(orderData);
			res.status(200).json(newOrder);
		}
	} catch (error) {
		res.status(500).json(error);
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
