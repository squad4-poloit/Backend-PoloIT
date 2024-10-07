import type { NextFunction, Request, Response } from "express";
import SkillService from "@src/services/skills.service";
import { idSchema } from "@src/schemas/uitls.schema";

const getSkills = async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const list_skills = await SkillService.getListSkills();

		res.status(200).json({ status: "200", data: list_skills });
	} catch (error) {
		next(error);
	}
};

const getSkill = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = idSchema.parse(req.params.id);

		const skill = await SkillService.getSkill(id);

		res.status(200).json({ status: "200", data: skill });
	} catch (error) {
		next(error);
	}
};

export { getSkills, getSkill };
