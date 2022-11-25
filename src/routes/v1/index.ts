import { Router } from "express";
import authRouter from "./auth.router";
import uploadRouter from "./upload.router";
import userRouter from "./user.router";
import variantRouter from "./variant.router";
import productRouter from "./product.router";
import groupProductRouter from "./groupproduct.router";
import orderRouter from "./order.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/upload", uploadRouter);
router.use("/user", userRouter);
router.use("/variant", variantRouter);
router.use("/product", productRouter);
router.use("/group-product", groupProductRouter);
router.use("/order", orderRouter);

export default router;
