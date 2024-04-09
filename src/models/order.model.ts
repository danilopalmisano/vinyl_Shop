import mongoose from "mongoose";
import { IOrder, statusEnum } from "../validation/order.validation";
import { stockEnum } from "../validation/product.validation";
import { date } from "zod";

const orderSchema = new mongoose.Schema<IOrder>(
	{
		shippingAddress: {
			adressLine1: {
				type: String,
			},
			addressLine2: {
				type: String,
			},
			city: {
				type: String,
			},
			state: {
				type: String,
			},
			zipCode: {
				type: String,
			},
			country: {
				type: String,
			},
		},
		paymentDetails: {
			type: {
				type: String,
			},
			maskedNumber: {
				type: String,
			},
		},
		cart: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "cart",
			},
		],
		status: {
			type: String,
			enum: statusEnum,
			default: "order created",
		},
	},
	{ timestamps: true }
);
