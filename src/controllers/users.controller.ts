import type { NextFunction, Request, Response } from "express";
import UserService from "@services/users.service";
import { GetUserSchema, GetUsersSchema } from "@schemas/users.schema";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { query } = GetUsersSchema.parse({
			query: req.query,
		});
		const {
			limit,
			page,
			institution,
			role,
			skill,
			id_insti,
			id_role,
			id_skill,
		} = query;

		const list_users = await UserService.paginatedListUsers(page, limit, {
			role,
			institution,
			skill,
			id_insti,
			id_role,
			id_skill,
		});

		const totalUsers = await UserService.getTotalUsers();
		const sendData = {
			users: list_users,
			info: {
				totalUsers,
				page,
				limit,
			},
		};

		res.status(200).json({ status: "200", data: sendData });
	} catch (error) {
		next(error);
	}
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { params } = GetUserSchema.parse({
			params: req.params,
		});
		console.log(params);

		const user = await UserService.getUser(params.id);

		res.status(200).json({ status: "200", data: user });
	} catch (error) {
		next(error);
	}
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
	const userId = req.params.id;
	try {
		const fieldsUpdated = req.body;
		const updatedUser = await UserService.updateUser(userId, fieldsUpdated);

		res.status(200).json({ status: "200", data: updatedUser });
	} catch (error) {
		next(error);
	}
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	const id = req.params.id;
	try {
		const deletedUser = await UserService.deleteUser(id);

		res.status(200).json({ status: "200", data: deletedUser });
	} catch (error) {
		next(error);
	}
};

export { getUsers, getUser, updateUser, deleteUser };
