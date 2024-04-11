import { z } from 'zod';
import { ZCartSchema } from './cart.validation.js';
import mongoose from 'mongoose';

export const statusEnum = [
	'order created',
	'shipped',
	'delivered',
	'cancelled',
] as const;

export const ZOrderSchema = z.object({
	shippingAddress: z.object({
		name: z.string().min(1),
		surname: z.string().min(1),
		addressLine: z.string(),
		city: z.string(),
		state: z.string(),
		zipCode: z.string(),
		country: z.string(),
	}),
	cart: z.array(ZCartSchema),
	status: z.enum(statusEnum).default('order created'),
});

export const ZOptionalOrderSchema = ZOrderSchema.partial();

//Interface
export interface IOrder extends z.infer<typeof ZOrderSchema> {
	_id?: mongoose.Types.ObjectId;
}
