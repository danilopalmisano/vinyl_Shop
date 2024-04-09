import { z } from "zod";
import { ZCartSchema } from "./cart.validation.js";
import mongoose from "mongoose";

export const statusEnum = [
	"order created",
	"shipped",
	"delivered",
	"cancelled",
] as const;

export const ZOrderSchema = z.object({
	shippingAddress: z.object({
		addressLine1: z.string(),
		addressLine2: z.string().optional(),
		city: z.string(),
		state: z.string(),
		zipCode: z.string(),
		country: z.string(),
	}),
	/*paymentDetails: z.object({
		type: z.string(), // e.g., credit card, debit card
		maskedNumber: z.string(), // Last 4 digits of card number
	}),*/
	cart: z.array(ZCartSchema),
	status: z.enum(statusEnum).default("order created"),
});

export const ZOptionalOrderSchema = ZOrderSchema.partial();

//Interface
export interface IOrder extends z.infer<typeof ZOrderSchema> {
	_id?: mongoose.Types.ObjectId;
}
