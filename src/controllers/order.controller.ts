import { Request, Response } from "express";
import { emptyUserCart, getUserCart } from '../services/cart.service';
import {
	calculateTotalCheckDataFromDB,
	checkProductStock,
	createOrderHandler,
	findOrder,
	getOrders,
	getOrdersByCartIdHandler,
	orderStatusHandler,
} from "../services/order.service";
import { ExtendedRequest } from "../middleware/authMiddleware";
import {
	IFormattedOrders,
	IOrder,
	ZShippingSchema,
} from "../validation/order.validation";
import { fromZodError } from "zod-validation-error";
import { ICart } from "../validation/cart.validation";
import { subProductStockQuantityHandler } from "../services/product.service";
import { findUserById } from "../services/auth.service";

//show all orders
export const showOrders = async (req: Request, res: Response) => {
	try {
		const orders = await getOrders();
		const formattedOrders = orders.map((order) => {
			const formattedOrder: IFormattedOrders = {
				_id: order._id,
				totalPrice: order.totalPrice,
				status: order.status,
				shippingAddress: order.shippingAddress,
				cart: order.cart,
			};
			return formattedOrder;
		});
		res.status(200).json(formattedOrders);
	} catch (error) {
		res.status(400).json(error);
	}
};

//show order by id
export const getOrderById = async (req: ExtendedRequest, res: Response) => {
	try {
		const userId = req.user?._id as string;
		const currentUser = await findUserById(userId);
		const orderId = req.params.id;
		if (!orderId) {
			return res.status(400).json({ message: "Missing order ID" });
		}
		const order = await findOrder(orderId);

		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}
		if (currentUser?.role === "admin" || order.userId === userId) {
			const formattedOrder: IFormattedOrders = {
				_id: order._id,
				totalPrice: order.totalPrice,
				status: order.status,
				shippingAddress: order.shippingAddress,
				cart: order.cart,
			};
			return res.status(200).json(formattedOrder);
		}
		return res.status(401).json({ message: "Unauthorized" });
	} catch (error) {
		return res.status(500).json({ message: "internal server error" });
	}
};

//create new order
export const createOrder = async (req: ExtendedRequest, res: Response) => {
	try {
		const userId = req.user?._id as string;
		const body = req.body;
		if (userId && body) {
			const cartFromUserId = (await getUserCart(userId)) as ICart;
			const userCartId = cartFromUserId._id?.toString();
			if (cartFromUserId === null) {
				return res.status(400).json({ message: 'Cart not found' });
			}
			if (cartFromUserId.lines.length === 0) {
				return res.status(400).json({
					message:
						'Cart is empty, cannot place order with empty cart',
				});
			}
			if (userCartId === undefined) {
				return res.status(400).json({ message: 'Cart not found' });
			}
			const orderWithThisCartIDExist = await getOrdersByCartIdHandler(
				userCartId
			);
			if (orderWithThisCartIDExist) {
				return res.status(400).json({
					message: 'Order with this cart already exist',
				});
			}
			const validationError = ZShippingSchema.safeParse(body);
			if (!validationError.success) {
				return res
					.status(400)
					.json(fromZodError(validationError.error).message);
			}
			const validateBody = validationError.data;

			const checkStock = await checkProductStock(cartFromUserId);
			if (checkStock instanceof Error) {
				return res.status(400).json(checkStock.message);
			}
			for (const line of cartFromUserId?.lines || []) {
				await subProductStockQuantityHandler(
					line.productId,
					line.quantity
				);
			}

			const realPrice = await calculateTotalCheckDataFromDB(
				cartFromUserId.lines
			);
			if (realPrice instanceof Error) {
				return res.status(400).json(realPrice.message);
			}
			const orderData: IOrder = {
				userId: userId,
				cart: cartFromUserId,
				shippingAddress: validateBody,
				totalPrice: parseFloat(realPrice.toFixed(2)),
			};
			const newOrder = await createOrderHandler(orderData);
			await emptyUserCart(userId);
			res.status(200).json(newOrder);
		}
	} catch (error) {
		res.status(500).json(error);
	}
};

//update order status
export const updateOrderStatus = async (req: Request, res: Response) => {
	try {
		const orderId = req.params.id;
		const existingOrder = await findOrder(orderId);
		if (existingOrder === null) {
			return res.status(400).json({ message: "Order not found" });
		}
		const orderStatus = await orderStatusHandler(orderId, "shipped");
		res.status(200).json({
			message: "Order status updated successfully",
			orderStatus: orderStatus?.status,
		});
	} catch (error) {
		res.status(400).json(error);
	}
};

//delete order status
export const deletedOrderStatus = async (req: Request, res: Response) => {
	try {
		const orderId = req.params.id;
		const existingOrder: IOrder | null = await findOrder(orderId);
		if (existingOrder?.status === "cancelled") {
			return res.status(400).json({ message: "Order already cancelled" });
		}

		const orderStatus = await orderStatusHandler(orderId, "cancelled");
		//to implement to re-add quantity to stock after deleted an order
		res.status(200).json({
			message: "Order status updated successfully",
			orderStatus: orderStatus?.status,
		});
	} catch (error) {
		res.status(400).json(error);
	}
};



