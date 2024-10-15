import prisma from "@database/client";
import type { Mentorship } from "@prisma/client";
import errors from "@lib/customErrors";
import type { PostMentorshipType } from "@schemas/mentorship.schema";
import { createNotification } from "./notification.service";

const selectMentorship = {
	id: true,
	title: true,
	description: true,
	status: true,
	student_spots: true,
	mentor_spots: true,
	start_date: true,
	end_date: true,
};

const getTotalMentorships = async () => {
	const total = await prisma.mentorship.count();
	return total;
};

export const isMentorshipExist = async (
	identifier: number,
): Promise<boolean> => {
	const existingMentorship = await prisma.mentorship.findUnique({
		where: { id: identifier },
	});

	return !!existingMentorship;
};

const getListMentorships = async () => {
	const mentorships = await prisma.mentorship.findMany({
		select: selectMentorship,
	});

	return mentorships;
};

const getMentorship = async (id: number) => {
	const mentorship = await prisma.mentorship.findUnique({
		where: {
			id,
		},
		select: selectMentorship,
	});
	return mentorship;
};

const createMentorship = async (mentorship: PostMentorshipType["body"]) => {
	const { mentor_spots, student_spots, ...rest } = mentorship;

	const newMentorship = await prisma.mentorship.create({
		data: {
			...rest,
			mentor_spots,
			student_spots,
			max_mentor_spots: mentor_spots,
			max_student_spots: student_spots,
		},
		select: selectMentorship,
	});
	return newMentorship;
};

const updateMentorship = async (
	id: number,
	fieldsUpdated: Partial<Mentorship>,
) => {
	const okMentorship = await isMentorshipExist(id);
	if (!okMentorship) {
		throw errors.not_found.withDetails("No se encontro la mentoria");
	}

	const updatedMentorship = await prisma.mentorship.update({
		where: { id },
		data: fieldsUpdated,
		select: selectMentorship,
	});
	return updatedMentorship;
};

const deleteMentorship = async (id: number) => {
	const okMentorship = await isMentorshipExist(id);
	if (!okMentorship) {
		throw errors.not_found.withDetails("No se encontro la mentoria");
	}

	const deletedMentorship = await prisma.mentorship.delete({
		where: { id },
		select: selectMentorship,
	});
	return deletedMentorship;
};

const addUserToMentorship = async (user_id: string, mentorship_id: number) => {
	const user = await prisma.user.findUnique({
		where: { id: user_id },
		select: {
			id: true,
			role: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});
	if (!user) {
		throw errors.not_found.withDetails(
			"No se ha encontrado un usuario con el ID proporcionado.",
		);
	}

	const mentorship = await prisma.mentorship.findUnique({
		where: { id: mentorship_id },
		include: { users: true },
	});

	if (!mentorship) {
		throw errors.not_found.withDetails(
			"No se ha encontrado una mentoria con el ID proporcionado.",
		);
	}

	const isUserAlreadyInMentorship = mentorship.users.some(
		(user) => user.userId === user_id,
	);
	if (isUserAlreadyInMentorship) {
		throw errors.conflict.withDetails("El usuario ya existe en la mentoria");
	}

	// TODO: validar los estados disponibles para agregar usuarios a mentorias
	// TODO: validar el cupo de mentores y alumnos
	// TODO: actualizar el valor del cupo de alumnos o mentores

	const userOnMentorship = await prisma.userOnMentorship.create({
		data: {
			user: {
				connect: { id: user_id },
			},
			mentorship: {
				connect: { id: mentorship_id },
			},
		},
	});
	const message = `You have been invited to the mentorship: ${mentorship.title}`;
	await createNotification(user_id, message);

	return userOnMentorship;
};

export default {
	getListMentorships,
	getMentorship,
	createMentorship,
	updateMentorship,
	deleteMentorship,
	getTotalMentorships,
	addUserToMentorship,
};
