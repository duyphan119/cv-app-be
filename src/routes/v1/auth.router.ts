import { Router } from "express";
import { requireLogin } from "../../middlewares/auth.middleware";
import authController from "../../controllers/auth.controller";

const router = Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.delete("/logout", authController.logout);
router.patch("/refresh", authController.refreshToken);
router.patch("/change-profile", requireLogin, authController.changeProfile);
router.post("/get-reset-code", authController.getResetCode);
router.get("/verify-reset-code", authController.verifyResetCode);
router.get("/profile", requireLogin, authController.getProfile);
router.get("/check-email", authController.checkEmail);
router.patch("/reset-password", authController.resetPassword);
router.patch("/change-password", requireLogin, authController.changePassword);

export default router;
