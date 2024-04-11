import { z } from "zod";
import { ZCartSchema } from "./cart.validation.js";
import mongoose from "mongoose";

export const statusEnum = [
	"order created",
	"processing",
	"packed",
	"shipped",
	"delivered",
	"cancelled",
] as const;

export const ZOrderSchema = z.object({
	userId: z.string(),
	cart: ZCartSchema,
	totalPrice: z.number().positive().optional(),
	status: z.enum(statusEnum).default("order created").optional(),
	shippingAddress: z.object({
		name: z.string().min(1),
		surname: z.string().min(1),
		addressLine: z.string(),
		zipCode: z.string(),
		city: z.string(),
		country: z.string(),
		state: z.string(),
	}),
});

export const ZOptionalOrderSchema = ZOrderSchema.partial();

//Interface
export interface IOrder extends z.infer<typeof ZOrderSchema> {
	_id?: mongoose.Types.ObjectId;
}
