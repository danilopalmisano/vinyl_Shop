import mongoose from "mongoose";
import { z } from "zod";
// import { ZCategorySchema } from "./category.validation";

export const stockEnum = ["out of stock", "in stock", "discontinued"] as const;

export const ZProductSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	price: z.number().positive(),
	images: z.array(z.string()).optional(),
	stockQuantity: z.number().positive(),
	stockStatus: z.enum(stockEnum).default("out of stock"),
	category: z.array(z.string()).optional(),
});

export const ZOptionalProductSchema = ZProductSchema.partial();
export type IOptionalProduct = z.infer<typeof ZOptionalProductSchema>;

//Interface
export interface IProduct extends z.infer<typeof ZProductSchema> {
	_id?: mongoose.Types.ObjectId;
}

export interface IFormattedProduct {
	_id?: mongoose.Types.ObjectId;
	name: string;
	description?: string;
	price: number;
	images?: string[];
	stockQuantity: number;
	stockStatus: (typeof stockEnum)[number];
	category?: string[];
}