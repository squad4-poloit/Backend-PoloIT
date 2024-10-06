import { Router } from "express";

import {
	deleteMentorship,
	getMentorship,
	getMentorships,
	postMentorship,
	updateMentorship,
} from "@src/controllers/mentorships.controller";

const router = Router();

router.get("/", getMentorships);
router.get("/:id", getMentorship);
router.post("/", postMentorship);
router.delete("/:id", deleteMentorship);
router.put("/:id", updateMentorship);

export { router };
