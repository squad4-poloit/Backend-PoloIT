import { Router } from "express";
import {
	getInstitutions,
	getInstitution,
} from "@controllers/institutions.controller";

const router = Router();

router.get("/", getInstitutions);
router.get("/:id", getInstitution);

export { router };
