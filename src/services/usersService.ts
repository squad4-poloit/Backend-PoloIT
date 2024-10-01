import prisma from "@database/client";
import type { User } from "@prisma/client";
import type { UserList, UsersFilters } from "@interfaces/user.interfaces";

const getTotalUsers = async () => {
	const total = await prisma.user.count();

	return total;
};

const paginatedListUsers = async (
	page = 1,
	limit = 10,
	filters?: UsersFilters,
): Promise<UserList[]> => {
	try {
		const take = limit;
		const skip = (page - 1) * limit;
		let where = {};
		if (filters) {
			const { role, institution, skill } = filters;
			where = {
				...(role && { role: { name: role } }),
				...(institution && { institution: { name: institution } }),
				...(skill && { skills: { some: { name: skill } } }),
			};
		}

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
				birth_date: true,
				linkedIn: true,
				phone: true,
				institutionId: true,
				roleId: true,
				role: true,
				institution: true,
				skills: true,
				mentorships: true,
			},
		});

		return users;
	} catch (error) {
		console.error("Error fetching users:", error);
		throw new Error("Failed to fetch users");
	}
};

const getUser = async (id: string): Promise<User | null> => {
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
	getTotalUsers,
};
