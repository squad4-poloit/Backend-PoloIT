import type { Request, Response } from "express";
import UserService from "@src/services/usersService";
import type { User } from "@prisma/client";
import type { GetUserListQueryType } from "@schemas/user.schema";

const getUsers = async (
	req: Request<unknown, unknown, unknown, GetUserListQueryType>,
	res: Response,
) => {
	try {
		const { page, limit, role, institution, skill } = req.query;
		console.log({ role, institution, skill });

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
		res.status(404).send("Not Found");
		console.error(error);
	}
};

const getUser = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		const user = await UserService.getUser(id);

		res.status(400).json({ status: "400", data: user });
	} catch (error) {
		res.status(404).json({ status: "404", data: "Not Found" });
		console.error(error);
	}
};

const postUser = async (req: Request, res: Response) => {
	const userData: User = req.body;
	try {
		const newUser = await UserService.createUser(userData);

		res.status(400).json({ status: "400", data: newUser });
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

		res.status(400).json({ status: "400", data: updatedUser });
	} catch (error) {
		res.status(404).json({ status: "404", data: "Not Found" });
		console.error(error);
	}
};

const deleteUser = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		const deletedUser = await UserService.deleteUser(id);

		res.status(400).json({ status: "400", data: deletedUser });
	} catch (error) {
		res.status(404).json({ status: "404", data: "Not Found" });
		console.error(error);
	}
};

export { getUsers, getUser, postUser, updateUser, deleteUser };
