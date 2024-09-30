import type { Request, Response } from "express";
import prisma from "../../prisma/client";

const getRoles = async (_req: Request, res: Response) => {
	try {
		const allRoles = await prisma.role.findMany();

		res.status(200).json({ status: "400", data: allRoles });
	} catch (error) {
		res.status(404).send({ status: "404", data: "Not Found" });
		console.error(error);
	}
};

const getRole = async (req: Request, res: Response) => {
	const role_id = Number(req.params.id);
	try {
		const role = await prisma.role.findFirst({
			where: {
				id: role_id,
			},
		});
		res.status(400).json({ status: "400", data: role });
	} catch (error) {
		res.status(404).json({ status: "404", data: "Not Found" });
		console.error(error);
	}
};

const postRole = async (req: Request, res: Response) => {
	const role = req.body;
	try {
		const newRole = await prisma.role.create({
			data: role,
		});
		res.status(400).json({ status: "400", data: newRole });
	} catch (error) {
		res.status(404).json({ status: "404", data: "Not Found" });
		console.error(error);
	}
};

const updateRole = async (req: Request, res: Response) => {
	const role_id = Number(req.params.id);
	try {
		const role = req.body;
		const updatedRole = await prisma.role.update({
			where: {
				id: role_id,
			},
			data: role,
		});
		res.status(400).json({ status: "400", data: updatedRole });
	} catch (error) {
		res.status(404).json({ status: "404", data: "Not Found" });
		console.error(error);
	}
};
const deleteRole = async (req: Request, res: Response) => {
	const role_id = Number(req.params.id);
	try {
		const deletedRole = await prisma.role.delete({
			where: {
				id: role_id,
			},
		});
		res.status(400).json({ status: "400", data: deletedRole });
	} catch (error) {
		res.status(404).json({ status: "404", data: "Not Found" });
		console.error(error);
	}
};

export { getRoles, getRole, postRole, updateRole, deleteRole };
