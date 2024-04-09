import mongoose from "mongoose";
import { IOrder, statusEnum } from '../validation/order.validation';

const orderSchema = new mongoose.Schema<IOrder>(
	{
		shippingAddress: {
			name: {
				type: String,
			},
			surname: {
				type: String,
			},
			adressLine1: {
				type: String,
			},
			// addressLine2: {
			// 	type: String,
			// },
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
		cart: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'cart',
			},
		],
		status: {
			type: String,
			enum: statusEnum,
			default: 'order created',
		},
	},
	{ timestamps: true }
);
