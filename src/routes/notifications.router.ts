import { Router } from "express";
import {
	getNotifications,
	markAsRead,
} from "@controllers/notification.controller";

const router = Router();

router.get("/:userId", getNotifications);
router.patch("/:notificationId", markAsRead);

export { router };
