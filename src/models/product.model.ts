import mongoose from "mongoose";
import { IProduct, stockEnum } from "../validation/product.validation";

const ProductSchema = new mongoose.Schema<IProduct>(
	{
		name: {
			type: String,
		},
		description: {
			type: String,
		},
		price: {
			type: Number,
		},

		images: [
			{
				type: String,
			},
		],

		stockQuantity: {
			type: Number,
		},

		stockStatus: {
			type: String,
			enum: stockEnum,
			default: "out of stock",
		},
		category: [
			{
				type: String,
			},
		],
	},
	{ timestamps: true }
);

export const Product = mongoose.model("Product", ProductSchema);
