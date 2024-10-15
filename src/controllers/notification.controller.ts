import type { Request, Response } from "express";
import {
	getUserNotifications,
	markNotificationAsRead,
} from "@services/notification.service";

const getNotifications = async (req: Request, res: Response) => {
	try {
		const userId = req.params.userId;
		const notifications = await getUserNotifications(userId);
		res.status(200).json(notifications);
	} catch (error) {
		res.status(500).json({ error: "Error fetching notifications" });
	}
};

const markAsRead = async (req: Request, res: Response) => {
	try {
		const notificationId = Number(req.params.notificationId);
		const notification = await markNotificationAsRead(notificationId);
		res.status(200).json(notification);
	} catch (error) {
		res.status(500).json({ error: "Error marking notification as read" });
	}
};

export { getNotifications, markAsRead };
