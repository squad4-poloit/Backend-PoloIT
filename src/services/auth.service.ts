import { encrypt, verified } from "@utils/bcrypt.handle";
import { generateToken } from "@utils/jwt.handle";
import prisma from "@database/client";
import type { Auth } from "@interfaces/auth.interface";
import type { User } from "@prisma/client";
import type { PostRegisterType } from "@schemas/auth.schema";
import errors from "@lib/customErrors";

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

const loginUser = async (loginParams: Auth) => {
	const user = await prisma.user.findUniqueOrThrow({
		where: { email: loginParams.email },
		select: {
			id: true,
			email: true,
			first_name: true,
			last_name: true,
			password: true,
			role: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});

	const passwordHash = user.password;
	const isCorrect = await verified(loginParams.password, passwordHash);

	if (!isCorrect) throw errors.invalid_pass;
	const userPayload = {
		id: user.id,
		email: user.email,
		role: user.role,
	};

	const token = generateToken(userPayload);

	const { password, ...rest } = user;

	const loginUser = {
		token,
		user: rest,
	};
	return loginUser;
};

export { registerNewUser, loginUser };
