import { z } from "zod";

export const zDecodedTokenSchema = z.object({
	id: z.string()
});

export type IDecodedToken = z.infer<typeof zDecodedTokenSchema>;
