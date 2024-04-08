import mongoose from 'mongoose';
import { z } from 'zod';
// import { ZCategorySchema } from "./category.validation";

const stockEnum = ['in stock', 'out of stock', 'discontinued'] as const;

export const ZProductSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	price: z.number().positive(),
	images: z.array(z.string()).optional(),
	stockQuantity: z.number().positive(),
	stockStatus: z.enum(stockEnum).default('out of stock'),
	category: z.array(z.string()).optional(),
});

export const ZOptionalProductSchema = ZProductSchema.partial();

//Interface
export interface IProduct extends z.infer<typeof ZProductSchema> {
	_id?: mongoose.Types.ObjectId;
}
