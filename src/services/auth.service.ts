import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";
import prisma from "@database/client";
import type { Auth } from "@interfaces/auth.interface";
import type { User } from "@prisma/client";

const registerNewUser = async ({
	dni,
	email,
	password,
	first_name,
	last_name,
	birth_date,
	roleId,
	institutionId,
}: User) => {
	const checkIs = await prisma.user.findUnique({ where: { email } });
	if (checkIs) {
		throw new Error(`Usuario con email ${email} ya existe`);
	}
	const passHash = await encrypt(password); //TODO 12345678
	const registerNewUser = await prisma.user.create({
		data: {
			dni,
			email,
			password: passHash,
			first_name,
			last_name,
			birth_date,
			roleId,
			institutionId,
		},
	});
	//TODO 123456
	return registerNewUser;
};

const loginUser = async ({ email, password }: Auth) => {
	const checkUser = await prisma.user.findUnique({ where: { email } });
	if (checkUser) {
		const passwordHash = checkUser.password; //TODO el encriptado!
		const isCorrect = await verified(password, passwordHash);

		if (!isCorrect) return "PASSWORD_INCORRECT";

		const token = generateToken(checkUser.email);
		const data = {
			token,
			user: checkUser,
		};
		return data;
	}
	throw new Error("Usuario no encontrado");
};

export { registerNewUser, loginUser };
