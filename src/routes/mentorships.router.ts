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

/**
 * @swagger
 * /mentorships:
 *   get:
 *     summary: Obtiene una lista de todas las mentorías
 *     tags: [Mentorship]
 *     responses:
 *       200:
 *         description: Lista de mentorías obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mentorship'
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", getMentorships);

/**
 * @swagger
 * /mentorships/{id}:
 *   get:
 *     summary: Obtiene los detalles de una mentoría por su ID
 *     tags: [Mentorship]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID de la mentoría
 *     responses:
 *       200:
 *         description: Mentoría obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mentorship'
 *       404:
 *         description: Mentoría no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id", getMentorship);

/**
 * @swagger
 * /mentorships:
 *   post:
 *     summary: Crea una nueva mentoría
 *     tags: [Mentorship]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mentorship'
 *     responses:
 *       201:
 *         description: Mentoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mentorship'
 *       400:
 *         description: Solicitud incorrecta (datos inválidos)
 *       401:
 *         description: No autorizado (falta de autenticación o rol insuficiente)
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", sessionAuth, rolesAuth(["ADMIN", "GESTOR"]), postMentorship);

/**
 * @swagger
 * /mentorships/{id}:
 *   delete:
 *     summary: Elimina una mentoría por su ID
 *     tags: [Mentorship]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID de la mentoría a eliminar
 *     responses:
 *       200:
 *         description: Mentoría eliminada exitosamente
 *       404:
 *         description: Mentoría no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:id", deleteMentorship);

/**
 * @swagger
 * /mentorships/{id}:
 *   patch:
 *     summary: Actualiza una mentoría por su ID
 *     tags: [Mentorship]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID de la mentoría a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mentorship'
 *     responses:
 *       200:
 *         description: Mentoría actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mentorship'
 *       400:
 *         description: Solicitud incorrecta (datos inválidos)
 *       404:
 *         description: Mentoría no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.patch("/:id", updateMentorship);

/**
 * @swagger
 * /mentorships/{id}/users:
 *   post:
 *     summary: Añade un usuario a una mentoría
 *     tags: [Mentorship]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID de la mentoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID del usuario a añadir
 *                 example: "c56a4180-65aa-42ec-a945-5fd21dec0538"
 *     responses:
 *       200:
 *         description: Usuario añadido a la mentoría exitosamente
 *       400:
 *         description: Solicitud incorrecta (datos inválidos)
 *       404:
 *         description: Mentoría o usuario no encontrados
 *       500:
 *         description: Error interno del servidor
 */
router.post("/:id/users", postUserToMentorship);

export { router };
