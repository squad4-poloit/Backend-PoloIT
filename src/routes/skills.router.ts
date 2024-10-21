import { Router } from "express";
import { getSkills, getSkill } from "@controllers/skills.controller";

const router = Router();

/**
 * @swagger
 * /skills:
 *   get:
 *     summary: Obtiene la lista de todas las habilidades
 *     tags: [Skill]
 *     responses:
 *       200:
 *         description: Lista de habilidades obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Skill'
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", getSkills);

/**
 * @swagger
 * /skills/{id}:
 *   get:
 *     summary: Obtiene los detalles de una habilidad específica
 *     tags: [Skill]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID de la habilidad
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalles de la habilidad obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Skill'
 *       404:
 *         description: Habilidad no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id", getSkill);

export { router };
