import { Router } from "express";
import userAddressController from "../../controllers/useraddress.controller";
import { requireLogin } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/user", requireLogin, userAddressController.getByUserId);
router.post("/", requireLogin, userAddressController.createUserAddress);
router.patch("/:id", requireLogin, userAddressController.updateUserAddress);
router.delete("/:id", requireLogin, userAddressController.deleteUserAddress);

export default router;
