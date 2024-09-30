import prisma from "@database/client";
import type { User } from "@prisma/client";

interface UserListFilters {
	institutionId?: number;
	roleId?: number;
}

const paginatedListUsers = async (
	page = 0,
	limit = 10,
	filters?: UserListFilters,
): Promise<User[]> => {
	try {
		const take = limit;
		const skip = (page - 1) * limit;
		const where = filters ? filters : {};

		const users = await prisma.user.findMany({
			skip,
			take,
			where,
			select: {
				id: true,
				dni: true,
				email: true,
				first_name: true,
				last_name: true,
				institutionId: true,
				roleId: true,
				birth_date: true,
				institution: true,
				linkedIn: true,
				phone: true,
				skills: {
					select: {
						name: true,
					},
				},
			},
		});
		console.log({ users });

		return users;
	} catch (error) {
		console.error("Error fetching users:", error);
		throw new Error("Failed to fetch users");
	}
};

const getUser = async (id: string): Promise<User | null> => {
	if (!id) {
		throw new Error("Invalid user id"); // Validar si el id es válido antes de realizar la consulta.
	}

	try {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});
		return user;
	} catch (error) {
		console.error(`Error fetching user with id ${id}:`, error);
		throw new Error("Failed to fetch user");
	}
};

const createUser = async (user: User) => {
	const newUser = await prisma.user.create({
		data: user,
	});
	return newUser;
};

const updateUser = async (id: string, fieldsUpdated) => {
	const updatedUser = await prisma.user.update({
		where: {
			id,
		},
		data: fieldsUpdated,
	});
	return updatedUser;
};

const deleteUser = async (id) => {
	const deletedUser = await prisma.user.delete({
		where: { id },
	});
	return deletedUser;
};

export default {
	paginatedListUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
};
