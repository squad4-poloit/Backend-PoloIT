import type { NextFunction, Request, Response } from "express";
import MentorshipService from "@services/mentorships.service";
import { PostMentorship } from "@schemas/mentorship.schema";
import { formatDateToString } from "@utils/date";

const getMentorships = async (
	_req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const allMentorships = await MentorshipService.getListMentorships();
		res.status(200).json({ status: "200", data: allMentorships });
	} catch (error) {
		next(error);
	}
};

const getMentorship = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const mentorship_id = Number(req.params.id);
		const mentorship = await MentorshipService.getMentorship(mentorship_id);
		res.status(200).json({ status: "200", data: mentorship });
	} catch (error) {
		next(error);
	}
};

const postMentorship = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { body } = PostMentorship.parse({ body: req.body });
		const newMentorship = await MentorshipService.createMentorship(body);
		const sendMentorship = {
			id: newMentorship.id,
			title: newMentorship.title,
			description: newMentorship.description,
			status: newMentorship.status,
			student_spots: newMentorship.student_spots,
			mentor_spots: newMentorship.mentor_spots,
			start_date: formatDateToString(newMentorship.start_date),
			end_date: formatDateToString(newMentorship.start_date),
		};

		res.status(200).json({ status: "200", data: sendMentorship });
	} catch (error) {
		next(error);
	}
};

const updateMentorship = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const mentorship_id = Number(req.params.id);
		const mentorship = req.body;
		const updatedMentorship = await MentorshipService.updateMentorship(
			mentorship_id,
			mentorship,
		);
		res.status(200).json({ status: "200", data: updatedMentorship });
	} catch (error) {
		next(error);
	}
};
const deleteMentorship = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const mentorship_id = Number(req.params.id);
		const deletedMentorship = MentorshipService.deleteMentorship(mentorship_id);
		res.status(200).json({ status: "200", data: deletedMentorship });
	} catch (error) {
		next(error);
	}
};

const postUserToMentorship = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userId = req.body.userId;
		const mentorshipId = Number(req.params.id);
		const resQuery = await MentorshipService.addUserToMentorship(
			userId,
			mentorshipId,
		);
		res.status(200).json({ status: "200", data: resQuery });
	} catch (error) {
		next(error);
	}
};

export {
	getMentorships,
	getMentorship,
	postMentorship,
	updateMentorship,
	deleteMentorship,
	postUserToMentorship,
};
