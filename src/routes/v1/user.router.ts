import { Router } from "express";
import userController from "../../controllers/user.controller";
import { requireIsAdmin } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/:id", userController.getUserById);
router.get("/", userController.getAllUsers);
router.delete("/:id", requireIsAdmin, userController.deleteUser);

export default router;
