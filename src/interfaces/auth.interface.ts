import type { JwtPayload } from "jsonwebtoken";
import type { Request } from "express";
export interface Auth {
	email: string;
	password: string;
}

export interface UserPayload extends JwtPayload {
	id: string;
	email: string;
	role: {
		id: number;
		name: string;
	};
}

export interface RequestJWT extends Request {
	user?: UserPayload;
}
