import mongoose from "mongoose";
import { ICart } from "../validation/cart.validation";

const cartSchema = new mongoose.Schema<ICart>(
	{
		userId: {
			type: String,
		},

		lines: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "lineId",
			},
		],
		totalPrice: {
			type: Number,
		},
	},
	{ timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);
