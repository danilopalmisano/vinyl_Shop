import { ZodTypeAny, z } from "zod";

const portCast = (
	port: ZodTypeAny //custom validation logic
) =>
	port.refine((value) => {
		const portRegex = /^\d+$/;
		if (
			!portRegex.test(value) ||
			parseInt(value, 10) < 1 ||
			parseInt(value, 10) > 65535
		) {
			throw new Error("Invalid port format");
		}
		return true;
	});

const envSchema = z.object({
	MONGODB_URI: z.string().min(1), //validation of env.MONGODB_URI (resolve its probably undefined trouble)

	ACCESS_SECRET_TOKEN: z.string().min(1),
	REFRESH_SECRET_TOKEN: z.string().min(1),

	LOCAL_DBNAME: z.string().min(1),
	DEV_DBNAME: z.string().min(1),
	PROD_DBNAME: z.string().min(1),

	LOCAL_PORT: portCast(z.string()), //effectively validating the port format.
	DEV_PORT: portCast(z.string()),
	PROD_PORT: portCast(z.string()),
});

export const env = envSchema.parse(process.env);
