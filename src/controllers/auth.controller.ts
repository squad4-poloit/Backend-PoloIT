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
		res.status(200).json({
			status: 200,
			message: "Registro realizado con exito",
			user: userRegistered,
		});
	} catch (error) {
		next(error);
	}
};

const postLogin = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { body } = PostLoginSchema.parse({ body: req.body });

		const resLogin = await loginUser(body);
		const token = resLogin.token;
		const isProd = process.env.NODE_ENV === "production";
		console.log(`estamos en produccion: ${isProd}`);
		res.cookie("token", token, {
			httpOnly: true,
			secure: isProd,
			sameSite: "strict",
			maxAge: 3600000,
		});
		res.status(200).json({
			status: 200,
			message: "Login exitoso y token enviado en cookie",
			token,
			user: resLogin.user,
		});
	} catch (error) {
		next(error);
	}
};

export { postLogin, postRegister };
