import { ZodError } from "zod";
import ApiError from "@src/utils/api.error"; // Asegúrate de que la ruta sea correcta
import type { NextFunction, Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// Función para manejar errores de Zod
const handleZodError = (error: ZodError) => {
	const formattedErrors = error.errors.map((err) => ({
		path: err.path.join("."),
		message: err.message,
	}));

	return new ApiError(
		400,
		"VALIDATION_ERROR",
		"Invalid input data",
	).withDetails(formattedErrors);
};

// Función para manejar errores de Prisma
const handlePrismaError = (error: PrismaClientKnownRequestError) => {
	switch (error.code) {
		case "P2002":
			return new ApiError(
				409,
				"DUPLICATE_ENTRY",
				`Unique constraint failed on: ${error.meta?.target}`,
			);
		case "P2025":
			return new ApiError(
				404,
				"RECORD_NOT_FOUND",
				"Record not found in database",
			);
		default:
			return new ApiError(400, "DATABASE_ERROR", "Database error occurred");
	}
};

// Manejador de errores general
export const errorHandler = (
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	error: any,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	console.log(error);
	let customError: ApiError;

	// Si el error es una instancia de ApiError, lo usamos tal cual
	if (error instanceof ApiError) {
		customError = error;
	}
	// Si es un ZodError, lo transformamos en un ApiError
	else if (error instanceof ZodError) {
		customError = handleZodError(error);
	}
	// Si es un error de Prisma, lo transformamos en ApiError
	else if (error instanceof PrismaClientKnownRequestError) {
		customError = handlePrismaError(error);
	}
	// Para cualquier otro error, generamos un error genérico
	else {
		customError = new ApiError(
			500,
			"INTERNAL_SERVER_ERROR",
			"An unexpected error occurred.",
		);
	}

	// Enviamos la respuesta de error
	res.status(customError.httpCode).json({
		type: customError.type,
		message: customError.message,
		details: customError.details || null,
	});
};
