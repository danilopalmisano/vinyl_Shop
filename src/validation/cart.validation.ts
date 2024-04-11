import mongoose from "mongoose";
import { z } from "zod";


export const ZLineItemSchema = z.object({
	productId: z.string(),
	quantity: z.number().positive(),
	price: z.number().positive().optional(),
	subtotal: z.number().positive().optional(),
});

export const ZCartSchema = z.object({
	userId: z.string(),
	lines: z.array(ZLineItemSchema),
	totalPrice: z.number().positive().optional(),
});

//Interface
export interface ILineItem extends z.infer<typeof ZLineItemSchema> {
	_id?: mongoose.Types.ObjectId;
}

//Interface
export interface ICart extends z.infer<typeof ZCartSchema> {
	_id?: mongoose.Types.ObjectId;
}

export interface IFormattedCart {
	_id?: mongoose.Types.ObjectId;
	userId: String;
	totalPrice?: Number;
	lines: {
		productId: string;
		quantity: number;
		price?: number;
		subtotal?: number;
	}[];
}
