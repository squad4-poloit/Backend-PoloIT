import prisma from "@database/client";
import type { User } from "@prisma/client";
import type { UserCustom, UsersFilters } from "@src/interfaces/user.interface";

const selectUser = {
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
): Promise<UserCustom[]> => {
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
		select: selectUser,
	});

	return users;
};

const getUser = async (id: string) => {
	try {
		const checkUser = await isUserExist(id);
		if (!checkUser) {
			throw new Error("Usuario no encontrado");
		}

		const user = await prisma.user.findUnique({
			where: {
				id,
			},
			select: selectUser,
		});
		return user;
	} catch (error) {
		console.error(`Error fetching user with id ${id}:`, error);
		throw new Error("Failed to fetch user");
	}
};
const createUser = async (user: User) => {
	try {
		const newUser = await prisma.user.create({
			data: { ...user },
		});
		return newUser;
	} catch (error) {
		throw new Error("Error creando el usuario");
	}
};

const updateUser = async (id: string, fieldsUpdated: Partial<User>) => {
	try {
		const okUser = await isUserExist(id);
		if (!okUser) {
			throw new Error("Usuario no encontrado");
		}

		const updatedUser = await prisma.user.update({
			where: { id },
			data: fieldsUpdated,
		});
		return updatedUser;
	} catch (error) {
		// Manejo de errores
		throw new Error("Error actualizando el usuario");
	}
};

// Eliminación de un usuario
const deleteUser = async (id: string) => {
	try {
		// Validar si el usuario existe antes de intentar eliminar
		const okUser = await isUserExist(id);
		if (!okUser) {
			throw new Error("Usuario no encontrado");
		}

		const deletedUser = await prisma.user.delete({
			where: { id },
		});
		return deletedUser;
	} catch (error) {
		// Manejo de errores
		throw new Error("Error eliminando el usuario");
	}
};

export default {
	paginatedListUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
	getTotalUsers,
};
