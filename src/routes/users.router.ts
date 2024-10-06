import { Router } from "express";
import {
	getUsers,
	getUser,
	updateUser,
	deleteUser,
} from "@src/controllers/users.controller";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.delete("/:id", updateUser);
router.put("/:id", deleteUser);

export { router };
