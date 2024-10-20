import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject } from "zod";

export const schemaValidation =
	(schema: AnyZodObject) =>
	(req: Request, _res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				params: req.params,
				query: req.query,
			});

			return next();
		} catch (error) {
			next(error);
		}
	};
