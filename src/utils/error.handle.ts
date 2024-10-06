import type { Response } from "express";
import { ZodError } from "zod";

const handleError = (
	res: Response,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	error: any,
	statusCode?: number,
	messageError?: string,
) => {
	const message = messageError || "Internal Server Error";
	const status = statusCode || 400;
	console.error("Error log:", error);

	const responseMessage =
		process.env.NODE_ENV === "development"
			? { message, error: error.message, stack: error.stack }
			: { message, status };

	if (error instanceof ZodError) {
		return res.status(status).json({
			status,
			message: message,
			error: error.message,
			issues: error.issues.map((issue) => ({
				path: issue.path,
				message: issue.message,
			})),
		});
	}

	return res.status(status).json(responseMessage);
};

export { handleError };
