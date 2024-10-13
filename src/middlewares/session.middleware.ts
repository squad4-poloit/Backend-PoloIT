import type { NextFunction, Response } from "express";
import type { RequestJWT, UserPayload } from "@interfaces/auth.interface";
import { verifyToken } from "@utils/jwt.handle";
import errors from "@lib/customErrors";

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

const sessionAuth = (req: RequestJWT, _res: Response, next: NextFunction) => {
	console.log("pasando por el middleware de auth");

	try {
		const authHeader = req.headers.authorization || "";
		const authCookie = req.cookies.token || "";
		console.log(`Auth Header: ${authHeader}`);
		console.log(`Cookie: ${authCookie}`);
		if ((!authCookie && !authHeader) || !authHeader.startsWith("Bearer ")) {
			throw errors.authorization_failed.withDetails(
				"Falta un metodo de autorización",
			);
		}

		const token = authCookie || authHeader.split(" ")[1];

		const userPayload = verifyToken(token);
		if (!isUser(userPayload)) {
			throw errors.authentication_failed.withDetails("No tiene un JWT valido");
		}

		req.user = userPayload;
		return next();
	} catch (error) {
		next(error);
	}
};

export { sessionAuth };
