import type { NextFunction, Request, Response } from "express";
import MentorshipService from "@services/mentorships.service";

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
		const mentorship = req.body;
		const newMentorship = await MentorshipService.createMentorship(mentorship);
		res.status(200).json({ status: "200", data: newMentorship });
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
