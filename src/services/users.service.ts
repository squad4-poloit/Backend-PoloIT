import prisma from "@database/client";
import type { User } from "@prisma/client";
import type { UsersFilters } from "@interfaces/user.interface";
import errors from "@lib/customErrors";

const selectUser = {
	id: true,
	dni: true,
	email: true,
	first_name: true,
	last_name: true,
	birth_date: true,
	linkedIn: true,
	phone: true,
	role: {
		select: {
			id: true,
			name: true,
		},
	},
	institution: {
		select: {
			id: true,
			name: true,
			type: true,
		},
	},
	skills: {
		select: {
			id: true,
			name: true,
		},
	},
	_count: {
		select: {
			mentorships: true,
		},
	},
};

const getRoleUser = async (id: string) => {
	const role = await prisma.user.findUniqueOrThrow({
		where: { id },
		select: {
			role: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});

	return role;
};

const getTotalUsers = async () => {
	const total = await prisma.user.count();
	return total;
};

export const isUserExist = async (
	identifier: string,
	isEmail = false,
): Promise<boolean> => {
	const existingUser = await prisma.user.findUnique({
		where: isEmail ? { email: identifier } : { id: identifier },
	});

	return !!existingUser;
};

const paginatedListUsers = async (
	page = 1,
	limit = 10,
	filters?: UsersFilters,
) => {
	const take = limit;
	const skip = (page - 1) * limit;
	let where = {};
	if (filters) {
		const { role, institution, skill, id_insti, id_role, id_skill } = filters;
		where = {
			...(id_role && { role: { id: id_role } }),
			...(id_insti && { institution: { id: id_insti } }),
			...(id_skill && { skills: { some: { id: skill } } }),
			...(role && { role: { name: role } }),
			...(institution && { institution: { name: institution } }),
			...(skill && { skills: { some: { name: skill } } }),
		};
	}

	const users = await prisma.user.findMany({
		skip,
		take,
		where,
		select: selectUser,
	});
	const formattedUsers = users.map((user) => ({
		...user,
		mentorshipCount: user._count?.mentorships,
		_count: undefined,
	}));

	return formattedUsers;
};

const getUser = async (id: string) => {
	const checkUser = await isUserExist(id);
	if (!checkUser) {
		throw errors.not_found.withDetails("Usuario no encontrado");
	}

	const user = await prisma.user.findUnique({
		where: {
			id,
		},
		select: selectUser,
	});
	return user;
};

const updateUser = async (id: string, fieldsUpdated: Partial<User>) => {
	const okUser = await isUserExist(id);
	if (!okUser) {
		throw errors.not_found.withDetails("El id del usuario no existe");
	}

	const updatedUser = await prisma.user.update({
		where: { id },
		data: fieldsUpdated,
	});
	return updatedUser;
};

// Eliminación de un usuario
const deleteUser = async (id: string) => {
	const okUser = await isUserExist(id);
	if (!okUser) {
		throw errors.not_found.withDetails("El id del usuario no existe");
	}

	const deletedUser = await prisma.user.delete({
		where: { id },
	});
	return deletedUser;
};

export default {
	paginatedListUsers,
	getUser,
	updateUser,
	deleteUser,
	getTotalUsers,
	getRoleUser,
};
