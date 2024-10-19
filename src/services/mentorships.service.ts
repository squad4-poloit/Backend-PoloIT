import prisma from "@database/client";
import type { EstadoMentoria, Mentorship } from "@prisma/client";
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
	console.log("Running getMentorship:");

	const res = await prisma.mentorship.findUnique({
		where: {
			id,
		},
		include: {
			users: {
				include: {
					user: true,
				},
			},
		},
	});
	console.log({ mentorship: res });
	console.log({ users: res?.users });

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
	console.log("Running createMentorship:");
	console.log({ mentorship });

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

const updatedMentorshipSpots = async (
	mentorshipId: number,
	opStudent = true,
	opInc = false,
) => {
	const mentorship = await prisma.mentorship.findFirstOrThrow({
		where: { id: mentorshipId },
	});

	let updatedField = {};

	if (opStudent) {
		if (!opInc && mentorship.student_spots <= 0) {
			throw errors.conflict.withDetails(
				"No se pueden agregar mas estudiantes, se ha alcanzado el cupo disponible.",
			);
		}

		if (opInc && mentorship.student_spots >= mentorship.max_student_spots) {
			throw errors.conflict.withDetails(
				"No se pueden quitar mas estudiantes, se ha alcanzado el cupo máximo",
			);
		}
		mentorship.student_spots = opInc
			? mentorship.student_spots + 1
			: mentorship.student_spots - 1;
		updatedField = { student_spots: mentorship.student_spots };
	} else {
		if (!opInc && mentorship.mentor_spots <= 0) {
			throw errors.conflict.withDetails(
				"No se pueden agregar mas mentores, se ha alcanzado el cupo disponible.",
			);
		}

		if (opInc && mentorship.mentor_spots >= mentorship.max_mentor_spots) {
			throw errors.conflict.withDetails(
				"No se pueden quitar mas mentores, se ha alcanzado el cupo máximo",
			);
		}
		mentorship.mentor_spots = opInc
			? mentorship.mentor_spots + 1
			: mentorship.mentor_spots - 1;
		updatedField = { mentor_spots: mentorship.mentor_spots };
	}

	const updatedMentorship = await prisma.mentorship.update({
		where: { id: mentorshipId },
		data: updatedField,
	});

	return updatedMentorship;
};

const addUserToMentorship = async (userId: string, mentorshipId: number) => {
	const user = await prisma.user.findUnique({
		where: { id: userId },
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
		where: { id: mentorshipId },
		include: { users: true },
	});

	if (!mentorship) {
		throw errors.not_found.withDetails(
			"No se ha encontrado una mentoria con el ID proporcionado.",
		);
	}
	const enabledStatus: EstadoMentoria[] = [
		"PENDIENTE",
		"PROGRAMADA",
		"ACEPTADA",
		"EN_PROGRESO",
	];

	if (!enabledStatus.includes(mentorship.status)) {
		throw errors.conflict.withDetails(
			`No se permite agregar mas usuario a la mentoria en el estado: ${mentorship.status}`,
		);
	}

	const isUserAlreadyInMentorship = mentorship.users.some(
		(user) => user.userId === userId,
	);

	if (isUserAlreadyInMentorship) {
		throw errors.conflict.withDetails("El usuario ya existe en la mentoria");
	}
	const isStudent = user.role.name === "EGRESADO";
	await updatedMentorshipSpots(mentorshipId, isStudent);

	const userOnMentorship = await prisma.userOnMentorship.create({
		data: {
			user: {
				connect: { id: userId },
			},
			mentorship: {
				connect: { id: mentorshipId },
			},
		},
	});

	const message = `Ha sido invitado a la mentoria: ${mentorship.title}`;
	await createNotification(userId, message);

	return userOnMentorship;
};

const updateMentorshipStatus = async (
	mentorshipId: number,
	newStatus: EstadoMentoria,
) => {
	const updatedMentorship = await prisma.mentorship.update({
		where: { id: mentorshipId },
		data: {
			status: newStatus,
		},
	});
	return updatedMentorship;
};

const getMentorshipsByUserId = async (userId: string) => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		include: {
			mentorships: true,
		},
	});
	if (!user) {
		throw errors.not_found.withDetails(
			"No se encontro un usuario con el ID proporcionado.",
		);
	}

	const userHasMentorships = user.mentorships.some(
		(mentorship) => mentorship.userId === userId,
	);
	if (!userHasMentorships) {
		throw errors.not_found.withDetails(
			"No se encontraron mentorias para el usuario",
		);
	}

	const userMentorships = await prisma.userOnMentorship.findMany({
		where: { userId },
		select: {
			mentorship: {
				select: selectMentorship,
			},
		},
	});

	return userMentorships;
};

export default {
	getListMentorships,
	getMentorship,
	createMentorship,
	updateMentorship,
	deleteMentorship,
	getTotalMentorships,
	addUserToMentorship,
	getMentorshipsByUserId,
	updateMentorshipStatus,
};
