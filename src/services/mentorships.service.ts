import prisma from "@database/client";
import type { Mentorship } from "@prisma/client";
import errors from "@lib/customErrors";

const selectMentorship = {
	id: true,
	title: true,
	description: true,
	status: true,
	student_spots: true,
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

const createMentorship = async (mentorship: Mentorship) => {
	const newMentorship = await prisma.mentorship.create({
		data: { ...mentorship },
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

const addUserToMentorship = async (userId: string, mentorshipId: number) => {
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
