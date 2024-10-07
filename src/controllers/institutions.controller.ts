import type { NextFunction, Request, Response } from "express";
import InstitutionService from "@src/services/institutions.service";
import { idSchema } from "@src/schemas/uitls.schema";

const getInstitutions = async (
	_req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const list_institutions = await InstitutionService.getListInstitutions();

		res.status(200).json({ status: "200", data: list_institutions });
	} catch (error) {
		next(error);
	}
};

const getInstitution = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = idSchema.parse(req.params.id);

		const institution = await InstitutionService.getInstitution(id);

		res.status(200).json({ status: "200", data: institution });
	} catch (error) {
		next(error);
	}
};

export { getInstitutions, getInstitution };
