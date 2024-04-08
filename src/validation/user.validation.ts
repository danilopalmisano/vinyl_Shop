import mongoose from "mongoose";
<<<<<<< HEAD
import { z } from 'zod';
=======
import { z } from "zod";
>>>>>>> 0489b261b4d6e112c2ee0b6a2a9c56ab27cbe8b1

export const roleEnum = ["user", "admin"] as const;

export const ZLoginSchema = z.object({
	email: z.string().toLowerCase().email(),
	password: z.string().min(5).max(100),
	loggedIn: z.boolean().optional().default(false),
});
export const ZUserSchema = z.object({
	username: z.string().min(1),
	login: ZLoginSchema.partial(),
	wishlist: z.array(z.string()).optional(), // Array of product IDs
	cart: z
		.array(
			z.object({
				productId: z.string(),
				quantity: z.number().positive(),
			})
		)
		.optional(),
	orders: z.array(z.string()).optional(),
	guestId: z.string().optional(),
	role: z.enum(roleEnum).default("user"),
});

//Interface
export const ZOptionalUser = ZUserSchema.partial();
export type IOptionalUser = z.infer<typeof ZOptionalUser>;
export interface IUser extends z.infer<typeof ZUserSchema> {
	//add id just to the interface, not necessary for guest cart
	_id?: mongoose.Types.ObjectId;
}

//Interface
export type ILogin = z.infer<typeof ZLoginSchema>;
