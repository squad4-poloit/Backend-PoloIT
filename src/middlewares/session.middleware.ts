import type { NextFunction, Response } from "express";
import type { RequestJWT, UserPayload } from "@interfaces/auth.interface";
import { verifyToken } from "@utils/jwt.handle";

const ERROR_MESSAGES = {
	NO_AUTH_HEADER: "Falta la cabecera de autorización",
	INVALID_JWT: "No tienes un JWT válido",
	SESSION_INVALID: "Sesión no válida",
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function isUser(user: any): user is UserPayload {
	return (
		typeof user === "object" &&
		user !== null &&
		typeof user.id === "string" &&
		typeof user.email === "string" &&
		typeof user.role.id === "number" &&
		typeof user.role.name === "string"
	);
}

const checkAuth = (req: RequestJWT, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization;
		const authCookie = req.cookies.token;
		console.log(`Auth Header: ${authHeader}`);
		console.log(`Cookie: ${authCookie}`);
		let token: string;
		if (!authCookie) {
			if (!authHeader || !authHeader.startsWith("Bearer ")) {
				return res.status(401).send(ERROR_MESSAGES.NO_AUTH_HEADER);
			}
			token = authHeader.split(" ")[1];
		}
		token = authCookie;

		const userPayload = verifyToken(token);
		if (!isUser(userPayload)) {
			return res.status(401).send(ERROR_MESSAGES.INVALID_JWT);
		}

		req.user = userPayload;
		return next();
	} catch (error) {
		console.error("Error en el middleware de autorización", error);

		res.status(400).send(ERROR_MESSAGES.SESSION_INVALID);
	}
};

export { checkAuth };
