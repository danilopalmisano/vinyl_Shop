import mongoose from "mongoose";
import { ICart } from "../validation/cart.validation";
import { lineItemSchema } from './line.model';

export const cartSchema = new mongoose.Schema<ICart>(
	{
		userId: {
			type: String,
		},

		lines: [
			{
				type: lineItemSchema,
				ref: "lineItem",
			},
		],
		totalPrice: {
			type: Number,
		},
	},
	{ timestamps: true },
);

export const Cart = mongoose.model("Cart", cartSchema);
