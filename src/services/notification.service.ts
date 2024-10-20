import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createNotification = async (userId: string, message: string) => {
	return await prisma.notification.create({
		data: {
			message,
			userId,
		},
	});
};

export const getUserNotifications = async (userId: string) => {
	return await prisma.notification.findMany({
		where: { userId },
		orderBy: { createdAt: "desc" },
	});
};

export const markNotificationAsRead = async (notificationId: number) => {
	return await prisma.notification.update({
		where: { id: notificationId },
		data: { read: true },
	});
};
