import mongoose from 'mongoose';
import { IOrder, statusEnum } from '../validation/order.validation';
import { cartSchema } from './cart.model';

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
			addressLine: {
				type: String,
			},
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
		cart: {
			type: cartSchema,
			ref: "cart",
		},
		status: {
			type: String,
			enum: statusEnum,
			default: "order created",
		},
	},
	{ timestamps: true },
);
export const Order = mongoose.model('Order', orderSchema);
