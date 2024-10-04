import { Router } from "express";
import {
	getUsers,
	getUser,
	postUser,
	updateUser,
	deleteUser,
} from "@src/controllers/users.controller";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", postUser);
router.delete("/:id", updateUser);
router.put("/:id", deleteUser);

export { router };
