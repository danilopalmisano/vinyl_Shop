import mongoose from 'mongoose';
import { z } from 'zod';

export const roleEnum = ['user', 'admin'] as const;

export const ZLoginSchema = z.object({
	email: z.string().toLowerCase().email(),
	password: z.string().min(5).max(100),
	loggedIn: z.boolean().optional().default(false),
});
export const ZUserSchema = z.object({
	username: z.string().min(1),
	login: ZLoginSchema.partial(),
	role: z.enum(roleEnum).default('user'),
});

//Interface
export const ZOptionalUser = ZUserSchema.partial();
export type IOptionalUser = z.infer<typeof ZOptionalUser>;
export interface IUser extends z.infer<typeof ZUserSchema> {
	_id?: mongoose.Types.ObjectId;
}

//Interface
export type ILogin = z.infer<typeof ZLoginSchema>;
