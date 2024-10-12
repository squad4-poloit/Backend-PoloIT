import { Router } from "express";
import {
	getUsers,
	getUser,
	updateUser,
	deleteUser,
} from "@controllers/users.controller";
import { checkAuth } from "@middlewares/session.middleware";

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene una lista paginada de usuarios con filtros opcionales
 *     tags: [User]
 *     parameters:
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Límite de usuarios a devolver por página
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Número de página para la paginación
 *       - name: institution
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           example: "Universidad XYZ"
 *         description: Filtro por nombre de institución
 *       - name: role
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           example: "Admin"
 *         description: Filtro por rol del usuario
 *       - name: skill
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           example: "JavaScript"
 *         description: Filtro por habilidad del usuario
 *       - name: id_insti
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Filtro por ID de la institución
 *       - name: id_role
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Filtro por ID del rol
 *       - name: id_skill
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Filtro por ID de la habilidad
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 info:
 *                   type: object
 *                   properties:
 *                     totalUsers:
 *                       type: integer
 *                       description: El número total de usuarios en la base de datos.
 *                       example: 100
 *                     page:
 *                       type: integer
 *                       description: Página actual de la paginación.
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       description: Cantidad de usuarios por página.
 *                       example: 10
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", checkAuth, getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "c56a4180-65aa-42ec-a945-5fd21dec0538"
 *         description: El ID del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id", getUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualiza un usuario por su ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "c56a4180-65aa-42ec-a945-5fd21dec0538"
 *         description: El ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Solicitud incorrecta (datos inválidos)
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put("/:id", updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Elimina un usuario por su ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "c56a4180-65aa-42ec-a945-5fd21dec0538"
 *         description: El ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:id", deleteUser);

export { router };
