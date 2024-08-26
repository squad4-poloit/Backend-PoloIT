import type { Request, Response } from "express";
import { prisma } from "../db";

export const getUsers = async (_req: Request, res: Response) => {
	try {
		const users = await prisma.user.findMany();
		res.json(users);
	} catch (error) {
		console.error(error);
	}
};

export const getUser = async (req: Request, res: Response) => {
	try {
		const user = await prisma.user.findFirst({
			where: {
				id: Number(req.params.id),
			},
		});
		res.json(user);
	} catch (error) {
		console.error(error);
	}
};

export const createUser = async (req: Request, res: Response) => {
	const { email, name } = req.body;
	const newUser = await prisma.user.create({
		data: {
			email,
			name,
		},
	});
	res.json(newUser);
};

export const deleteUser = async (req: Request, res: Response) => {
	const user = await prisma.user.delete({
		where: {
			id: Number(req.params.id),
		},
	});
	res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
	const user = await prisma.user.update({
		where: {
			id: Number(req.params.id),
		},
		data: req.body,
	});
	res.json(user);
};
