import mongoose from "mongoose";
import { ILineItem } from "../validation/cart.validation";

export const lineItemSchema = new mongoose.Schema<ILineItem>(
	{
		productId: {
			type: String,
		},
		quantity: {
			type: Number,
		},
		price: {
			type: Number,
		},

		subtotal: {
			type: Number,
		},
	},
	{ timestamps: true },
);

export const LineItm = mongoose.model("Line", lineItemSchema);
