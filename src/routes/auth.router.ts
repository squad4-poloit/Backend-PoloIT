import { Router } from "express";
import { postRegister, postLogin } from "@controllers/auth.controller";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dni:
 *                 type: string
 *                 description: Documento de identidad del usuario
 *                 example: "12345678"
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: "usuario@gestor.com"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: "12345678"
 *               first_name:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: "Juan"
 *               last_name:
 *                 type: string
 *                 description: Apellido del usuario
 *                 example: "Pérez"
 *               birth_date:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento del usuario
 *                 example: "1990-01-01"
 *               institutionId:
 *                 type: integer
 *                 description: id de la institución
 *                 example: "2"
 *               roleId:
 *                 type: integer
 *                 description: ID del rol
 *                 example: "2"
 *
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Solicitud incorrecta (datos inválidos)
 *       500:
 *         description: Error interno del servidor
 */
router.post("/register", postRegister);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión un usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: "usuario@gestor.com"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT de autenticación
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       400:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error interno del servidor
 */
router.post("/login", postLogin);

export { router };
