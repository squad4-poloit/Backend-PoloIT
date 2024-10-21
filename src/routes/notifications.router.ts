import { Router } from "express";
import {
	getNotifications,
	markAsRead,
} from "@controllers/notification.controller";

const router = Router();

/**
 * @swagger
 * /notifications/{userId}:
 *   get:
 *     summary: Obtiene todas las notificaciones de un usuario
 *     tags: [Notification]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: ID del usuario
 *           example: "c56a4180-65aa-42ec-a945-5fd21dec0538"
 *     responses:
 *       200:
 *         description: Lista de notificaciones obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:userId", getNotifications);

/**
 * @swagger
 * /notifications/{notificationId}:
 *   patch:
 *     summary: Marca una notificación como leída
 *     tags: [Notification]
 *     parameters:
 *       - name: notificationId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: ID de la notificación
 *           example: "1"
 *     responses:
 *       200:
 *         description: Notificación marcada como leída exitosamente
 *       404:
 *         description: Notificación no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.patch("/:notificationId", markAsRead);

export { router };
