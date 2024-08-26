import { Router } from "express";
import {
	createUser,
	deleteUser,
	getUser,
	getUsers,
	updateUser,
} from "../controllers/userController";

const router = Router();

router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.post("/user", createUser);
router.delete("/user/:id", deleteUser);
router.patch("/user/:id", updateUser);

export default router;
