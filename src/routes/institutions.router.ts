import { Router } from "express";
import {
	getInstitutions,
	getInstitution,
} from "@controllers/institutions.controller";

const router = Router();

/**
 * @swagger
 * /institutions:
 *   get:
 *     summary: Obtiene la lista de todas las instituciones
 *     tags: [Institution]
 *     responses:
 *       200:
 *         description: Lista de instituciones obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Institution'
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", getInstitutions);

/**
 * @swagger
 * /institutions/{id}:
 *   get:
 *     summary: Obtiene los detalles de una institución específica
 *     tags: [Institution]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID de la institución
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalles de la institución obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Institution'
 *       404:
 *         description: Institución no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id", getInstitution);

export { router };
