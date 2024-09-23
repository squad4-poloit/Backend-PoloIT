import type { Request, Response } from "express";
import prisma from "@models/client";

const getUsers = async (_req: Request, res: Response) => {
	try {
		const list_users = await prisma.user.findMany();
		res.status(400).json({ status: "400", data: list_users });
	} catch (error) {
		res.status(404).send("Not Found");
		console.error(error);
	}
};

const getUser = async (req: Request, res: Response) => {
	const user_id = req.params.id;
	try {
		const user = await prisma.user.findFirst({
			where: {
				id: user_id,
			},
		});
		res.status(400).json({ status: "400", data: user });
	} catch (error) {
		res.status(404).json({ status: "404", data: "Not Found" });
		console.error(error);
	}
};

const postUser = async (req: Request, res: Response) => {
	const { email, first_name, last_name, dni, phone, role } = req.body;
	try {
		const newUser = await prisma.user.create({
			data: {
				email: email,
				first_name: first_name,
				last_name: last_name,
				dni: dni,
				phone: phone,
				roleId: role,
			},
		});
		res.status(400).json({ status: "400", data: newUser });
	} catch (error) {
		res.status(404).json({ status: "404", data: "Not Found" });
		console.error(error);
	}
};
const updateUser = async (req: Request, res: Response) => {
	const user_id = req.params.id;
	try {
		const fieldsUpdated = req.body;
		const updatedUser = await prisma.user.update({
			where: {
				id: user_id,
			},
			data: fieldsUpdated,
		});
		res.status(400).json({ status: "400", data: updatedUser });
	} catch (error) {
		res.status(404).json({ status: "404", data: "Not Found" });
		console.error(error);
	}
};

const deleteUser = async (req: Request, res: Response) => {
	const user_id = req.params.id;
	try {
		const deletedUser = await prisma.user.delete({
			where: {
				id: user_id,
			},
		});
		res.status(400).json({ status: "400", data: deletedUser });
	} catch (error) {
		res.status(404).json({ status: "404", data: "Not Found" });
		console.error(error);
	}
};

export { getUsers, getUser, postUser, updateUser, deleteUser };
