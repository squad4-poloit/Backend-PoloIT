import type { NextFunction, Request, Response } from "express";
import { registerNewUser, loginUser } from "@services/auth.service";
import { PostLoginSchema, PostRegisterSchema } from "@schemas/auth.schema";

const postRegister = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { body } = PostRegisterSchema.parse({ body: req.body });
		const userRegistered = await registerNewUser(body);
		res.status(200).send(userRegistered);
	} catch (error) {
		next(error);
	}
};

const postLogin = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { body } = PostLoginSchema.parse({ body: req.body });

		const responseUser = await loginUser(body);
		res.status(200).send(responseUser);
	} catch (error) {
		next(error);
	}
};

export { postLogin, postRegister };
