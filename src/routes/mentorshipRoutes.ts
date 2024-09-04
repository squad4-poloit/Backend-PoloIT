import { Router } from "express";
import mentorshipController from "../controllers/mentorshipController";

const router = Router();

router.get("/mentorships", mentorshipController.getAllMentorships);
router.get("/mentorships/:id", mentorshipController.getMentorship);
router.post("/mentorships", mentorshipController.createMentorship);
router.delete("/mentorships/:id", mentorshipController.deleteMentorship);
router.patch("/mentorships/:id", mentorshipController.updateMentorship);

export default router;
