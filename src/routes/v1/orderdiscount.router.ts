import { Router } from "express";
import {
  requireIsAdmin,
  requireLogin,
} from "../../middlewares/auth.middleware";
import orderDiscountController from "../../controllers/orderdiscount.controller";

const router = Router();

router.get("/check", requireLogin, orderDiscountController.check);
router.get("/", requireIsAdmin, orderDiscountController.getAllOrderDiscounts);
router.post("/", requireLogin, orderDiscountController.createOrderDiscount);

export default router;
