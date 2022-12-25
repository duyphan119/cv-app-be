import { Router } from "express";
import {
  requireIsAdmin,
  requireLogin,
} from "../../middlewares/auth.middleware";
import orderController from "../../controllers/order.controller";

const router = Router();

router.get("/cart", requireLogin, orderController.getCart);
router.get("/user", requireLogin, orderController.getOrdersByUserId);
router.get("/:id", requireIsAdmin, orderController.getOrderById);
router.get("/", requireIsAdmin, orderController.getAllOrders);
router.post("/cart-item", requireLogin, orderController.createCartItem);
router.patch("/cart-item/:id", requireLogin, orderController.updateCartItem);
router.patch("/checkout", requireLogin, orderController.checkout);
router.patch("/:id/status", requireIsAdmin, orderController.updateStatus);
router.delete("/cart-item/:id", requireLogin, orderController.deleteCartItem);

export default router;
