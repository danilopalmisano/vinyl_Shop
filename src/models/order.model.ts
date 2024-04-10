import mongoose from "mongoose";
import { IOrder, statusEnum } from "../validation/order.validation";
import { cartSchema } from "./cart.model";

const orderSchema = new mongoose.Schema<IOrder>(
	{
		userId: {
			type: String,
		},
		shippingAddress: {
			name: {
				type: String,
			},
			surname: {
				type: String,
			},
			addressLine1: {
				type: String,
			},
			// addressLine2: {
			// 	type: String,
			//},
			zipCode: {
				type: String,
			},
			city: {
				type: String,
			},
			country: {
				type: String,
			},
			state: {
				type: String,
			},
		},
		// paymentDetails: {
		// 	type: {
		// 		type: String,
		// 	},
		// 	maskedNumber: {
		// 		type: String,
		// 	},
		// },
		cart: {
			type: cartSchema,
			ref: "cart",
		},
		status: {
			type: String,
			enum: statusEnum,
			default: "order created",
		},
		totalPrice: {
			type: Number,
		},
	},
	{ timestamps: true },
);
export const Order = mongoose.model("Order", orderSchema);
