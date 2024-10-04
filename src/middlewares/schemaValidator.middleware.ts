import type { NextFunction, Request, Response } from "express";
import { type AnyZodObject, ZodError } from "zod";

export const schemaValidation =
	(schema: AnyZodObject) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				params: req.params,
				query: req.query,
			});

			return next();
		} catch (error) {
			console.log(error);
			if (error instanceof ZodError) {
				return res.status(400).json(
					error.issues.map((issue) => ({
						path: issue.path,
						message: issue.message,
					})),
				);
			}
			return res.status(400).json({ message: "internal server error" });
		}
	};
