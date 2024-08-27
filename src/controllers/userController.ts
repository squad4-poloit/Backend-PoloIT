import type { Request, Response } from "express";
import { prisma } from "../db";

export const getUsers = async (_req: Request, res: Response) => {
	try {
		const users = await prisma.user.findMany();
		res.status(200).json(users);
		
	} catch (error) {
		res.status(404).send('Not Found');
		console.error(error);
	}
};

export const getUser = async (req: Request, res: Response) => {
	try {
		const user = await prisma.user.findFirst({
			where: {
				id: (req.params.id),
			},
		});
		res.json(user);
	} catch (error) {
		console.error(error);
	}
};

export const createUser = async (req: Request, res: Response) => {
	const { email, first_name } = req.body;
	
	const user = await prisma.user.create({
		data: {
		  email: email,
		  first_name: first_name,
		  last_name:'test'
		},
	  })
	res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
	const user = await prisma.user.delete({
		where: {
			id: (req.params.id),
		},
	});
	res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
	const user = await prisma.user.update({
		where: {
			id: (req.params.id),
		},
		data: req.body,
	});
	res.json(user);
};
