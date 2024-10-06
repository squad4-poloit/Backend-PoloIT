import { encrypt, verified } from "@utils/bcrypt.handle";
import { generateToken } from "@utils/jwt.handle";
import prisma from "@database/client";
import type { Auth } from "@interfaces/auth.interface";
import type { User } from "@prisma/client";
import type { PostRegisterType } from "@src/schemas/auth.schema";
import errors from "@src/lib/customErrors";
// import errors from "@src/lib/customErrors";

const registerNewUser = async ({
	dni,
	email,
	password,
	first_name,
	last_name,
	birth_date,
	roleId,
	institutionId,
}: PostRegisterType["body"]): Promise<User> => {
	console.log(email);

	const passHash = await encrypt(password);
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

	return registerNewUser;
};

const loginUser = async ({ email, password }: Auth) => {
	const user = await prisma.user.findUniqueOrThrow({ where: { email } }); // Si no encuentra al usuario lanza un error

	const passwordHash = user.password; //TODO el encriptado!
	const isCorrect = await verified(password, passwordHash);

	if (!isCorrect) throw errors.invalid_pass;

	const token = generateToken(user.email);
	const data = {
		token,
		user: user,
	};
	return data;
};

export { registerNewUser, loginUser };
