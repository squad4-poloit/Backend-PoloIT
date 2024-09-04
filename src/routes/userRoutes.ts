import { Router } from "express";
import UserController from "../controllers/usersController";

const router = Router();

router.get("/users", UserController.getUser);
router.get("/users/:id", UserController.getUser);
router.post("/users", UserController.createUser);
router.delete("/users/:id",UserController.deleteUser );
router.patch("/users/:id", UserController.updateUser);

export default router;
