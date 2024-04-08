import * as bcrypt from "bcrypt";

export async function hashStuff(password: string | undefined): Promise<string> {
	if (!password) {
		throw new Error("password undefined");
	}
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
}
