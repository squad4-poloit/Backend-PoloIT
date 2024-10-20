import { Router } from "express";

import {
	deleteMentorship,
	getMentorship,
	getMentorships,
	postMentorship,
	updateMentorship,
	postUserToMentorship,
} from "@controllers/mentorships.controller";
import { rolesAuth, sessionAuth } from "@middlewares/session.middleware";

const router = Router();

router.get("/", getMentorships);
router.get("/:id", getMentorship);
router.post("/", sessionAuth, rolesAuth(["ADMIN", "GESTOR"]), postMentorship);
router.delete("/:id", deleteMentorship);
router.patch("/:id", updateMentorship);
router.post("/:id/users", postUserToMentorship);

export { router };
