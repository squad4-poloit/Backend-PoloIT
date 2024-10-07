import type { Request, Response } from "express";
import prisma from "../../prisma/client";

const getMentorships = async (_req: Request, res: Response) => {
	try {
		const allMentorships = await prisma.mentorship.findMany();
		res.status(200).json({ status: "200", data: allMentorships });
	} catch (error) {
		res.status(404).send({ status: "404", data: "Not Found" });
		console.error(error);
	}
};

const getMentorship = async (req: Request, res: Response) => {
	const mentorship_id = Number(req.params.id);
	try {
		const mentorship = await prisma.mentorship.findFirst({
			where: {
				id: mentorship_id,
			},
		});
		res.status(200).json({ status: "200", data: mentorship });
	} catch (error) {
		res.status(404).json({ status: "404", data: "Not Found" });
		console.error(error);
	}
};

const postMentorship = async (req: Request, res: Response) => {
	const mentorship = req.body;
	try {
		const newMentorship = await prisma.mentorship.create({
			data: mentorship,
		});
		res.status(200).json({ status: "200", data: newMentorship });
	} catch (error) {
		res.status(404).json({ status: "404", data: "Not Found" });
		console.error(error);
	}
};

const updateMentorship = async (req: Request, res: Response) => {
	const mentorship_id = Number(req.params.id);
	try {
		const mentorship = req.body;
		const updatedMentorship = await prisma.mentorship.update({
			where: {
				id: mentorship_id,
			},
			data: mentorship,
		});
		res.status(200).json({ status: "200", data: updatedMentorship });
	} catch (error) {
		res.status(404).json({ status: "404", data: "Not Found" });
		console.error(error);
	}
};
const deleteMentorship = async (req: Request, res: Response) => {
	const mentorship_id = Number(req.params.id);
	try {
		const deletedMentorship = await prisma.mentorship.delete({
			where: {
				id: mentorship_id,
			},
		});
		res.status(200).json({ status: "200", data: deletedMentorship });
	} catch (error) {
		res.status(404).json({ status: "404", data: "Not Found" });
		console.error(error);
	}
};

export {
	getMentorships,
	getMentorship,
	postMentorship,
	updateMentorship,
	deleteMentorship,
};
