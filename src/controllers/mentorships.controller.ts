import type { NextFunction, Request, Response } from "express";
import MentorshipService from "@services/mentorships.service";
import {
	PostMentorship,
	PostUserToMentorshipSchema,
} from "@schemas/mentorship.schema";
import { formatDateToString } from "@utils/date";
import type { RequestJWT } from "@interfaces/auth.interface";

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
	req: RequestJWT,
	res: Response,
	next: NextFunction,
) => {
	try {
		console.log("Pasando por el controlador de crear mentoria");

		const { body } = PostMentorship.parse({ body: req.body });
		const newMentorship = await MentorshipService.createMentorship(body);
		const { start_date, end_date, ...rest } = newMentorship;
		const sendMentorship = {
			...rest,
			start_date: formatDateToString(start_date),
			end_date: formatDateToString(end_date),
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
		const { body, params } = PostUserToMentorshipSchema.parse({
			body: req.body,
			params: {
				mentorship_id: req.params.id,
			},
		});

		const resQuery = await MentorshipService.addUserToMentorship(
			body.user_id,
			params.mentorship_id,
		);
		res.status(200).json({
			status: "200",
			message: "Se agrego el usuario a la mentoria con exito",
			data: resQuery,
		});
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
