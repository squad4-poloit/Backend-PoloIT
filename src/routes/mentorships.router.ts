import { Router } from "express";

import {
	deleteMentorship,
	getMentorship,
	getMentorships,
	postMentorship,
	updateMentorship,
	postUserToMentorship,
} from "@controllers/mentorships.controller";

const router = Router();

router.get("/", getMentorships);
router.get("/:id", getMentorship);
router.post("/", postMentorship);
router.delete("/:id", deleteMentorship);
router.patch("/:id", updateMentorship);
router.post("/:id/users", postUserToMentorship);

export { router };
