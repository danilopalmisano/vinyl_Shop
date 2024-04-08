import zodSchema from "@zodyac/zod-mongoose";
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

// MongoModel
const LineItemModel = zodSchema(ZLineItemSchema);
export const LineItem = mongoose.model('LineItem', LineItemModel);

//Interface
export interface ILineItem extends z.infer<typeof ZLineItemSchema> {
	_id?: mongoose.Types.ObjectId;
}

// MongoModel
const CartModel = zodSchema(ZCartSchema);
export const Cart = mongoose.model('Cart', CartModel);

//Interface
export interface ICart extends z.infer<typeof ZCartSchema> {
	_id?: mongoose.Types.ObjectId;
}