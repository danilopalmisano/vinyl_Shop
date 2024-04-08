import zodSchema from "@zodyac/zod-mongoose";
import mongoose from "mongoose";
import { z } from "zod";
import { ZCategorySchema } from "./category.validation";

const stockEnum = ["in stock", "out of stock", "discontinued"] as const;

export const ZProductSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	price: z.number().positive(),
	images: z.array(z.string()).optional(),
	stockQuantity: z.number().positive(),
	stockStatus: z.enum(stockEnum).default("out of stock"),
	category: ZCategorySchema.partial(),
});

export const ZOptionalProductSchema = ZProductSchema.partial();
// MongoModel
const ProductModel = zodSchema(ZProductSchema);
export const Product = mongoose.model("Product", ProductModel);

//Interface
export interface IProduct extends z.infer<typeof ZProductSchema> {
	_id?: mongoose.Types.ObjectId;
}
