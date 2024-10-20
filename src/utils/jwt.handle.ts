import { sign, verify } from "jsonwebtoken";
import type { UserPayload } from "@interfaces/auth.interface";
const JWT_SECRET = process.env.JWT_SECRET || "secret";

const generateToken = (user: UserPayload) => {
	const jwt = sign(user, JWT_SECRET, {
		expiresIn: "2h",
	});
	return jwt;
};

const verifyToken = (jwt: string) => {
	const payload = verify(jwt, JWT_SECRET);
	return payload;
};

export { generateToken, verifyToken };
