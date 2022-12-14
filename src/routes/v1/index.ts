import { Router } from "express";
import authRouter from "./auth.router";
import uploadRouter from "./upload.router";
import userRouter from "./user.router";
import variantRouter from "./variant.router";
import productRouter from "./product.router";
import groupProductRouter from "./groupproduct.router";
import orderRouter from "./order.router";
import productVariantImageRouter from "./productvariantimage.router";
import variantValueRouter from "./variantvalue.router";
import productVariantRouter from "./productvariant.router";
import userAddessRouter from "./useraddress.router";
import orderDiscountRouter from "./orderdiscount.router";
import blogRouter from "./blog.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/upload", uploadRouter);
router.use("/user", userRouter);
router.use("/variant", variantRouter);
router.use("/variant-value", variantValueRouter);
router.use("/product", productRouter);
router.use("/group-product", groupProductRouter);
router.use("/order", orderRouter);
router.use("/product-variant-image", productVariantImageRouter);
router.use("/product-variant", productVariantRouter);
router.use("/user-address", userAddessRouter);
router.use("/order-discount", orderDiscountRouter);
router.use("/blog", blogRouter);

export default router;
