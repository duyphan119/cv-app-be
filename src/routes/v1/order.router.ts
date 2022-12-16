import { Router } from "express";
import { requireLogin } from "../../middlewares/auth.middleware";
import orderController from "../../controllers/order.controller";

const router = Router();

router.post("/cart-item", requireLogin, orderController.createCartItem);
router.get("/cart", requireLogin, orderController.getCart);
router.patch("/checkout", requireLogin, orderController.checkout);
router.get("/user", requireLogin, orderController.userOrders);
router.delete("/cart-item/:id", requireLogin, orderController.deleteCartItem);
router.patch("/cart-item/:id", requireLogin, orderController.updateCartItem);

export default router;
