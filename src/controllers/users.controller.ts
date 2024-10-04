import type { Request, Response } from "express";
import UserService from "@src/services/users.service";
import type { User } from "@prisma/client";
import { GetUserSchema, GetUsersSchema } from "@src/schemas/users.schema";
import { handleError } from "@src/utils/error.handle";

const getUsers = async (req: Request, res: Response) => {
	try {
		const { query } = GetUsersSchema.parse({
			query: req.query,
		});
		const { limit, page, institution, role, skill } = query;

		const list_users = await UserService.paginatedListUsers(page, limit, {
			role,
			institution,
			skill,
		});

		const totalUser = await UserService.getTotalUsers();
		const sendData = {
			users: list_users,
			info: {
				totalUsers: totalUser,
				page,
				limit,
			},
		};

		res.status(200).json({ status: "200", data: sendData });
	} catch (error) {
		handleError(res, error);
	}
};

const getUser = async (req: Request, res: Response) => {
	try {
		const { params } = GetUserSchema.parse({
			params: req.params,
		});
		console.log(params);

		const user = await UserService.getUser(params.id);

		res.status(200).json({ status: "200", data: user });
	} catch (error) {
		handleError(res, error);
		console.error(error);
	}
};

const postUser = async (req: Request, res: Response) => {
	const userData: User = req.body;
	try {
		const newUser = await UserService.createUser(userData);

		res.status(200).json({ status: "200", data: newUser });
	} catch (error) {
		res.status(404).json({ status: "404", data: "Not Found" });
		console.error(error);
	}
};
const updateUser = async (req: Request, res: Response) => {
	const userId = req.params.id;
	try {
		const fieldsUpdated = req.body;
		const updatedUser = await UserService.updateUser(userId, fieldsUpdated);

		res.status(200).json({ status: "200", data: updatedUser });
	} catch (error) {
		res.status(404).json({ status: "404", data: "Not Found" });
		console.error(error);
	}
};

const deleteUser = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		const deletedUser = await UserService.deleteUser(id);

		res.status(200).json({ status: "200", data: deletedUser });
	} catch (error) {
		res.status(404).json({ status: "404", data: "Not Found" });
		console.error(error);
	}
};

export { getUsers, getUser, postUser, updateUser, deleteUser };
