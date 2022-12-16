import { Router } from "express";
import productVariantController from "../../controllers/productvariant.controller";
import { requireIsAdmin } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/:id", productVariantController.getProductVariantById);
router.get("/", productVariantController.getAllProductVariants);
router.post(
  "/many",
  requireIsAdmin,
  productVariantController.createProductVariants
);
router.post("/", requireIsAdmin, productVariantController.createProductVariant);
router.patch(
  "/many",
  requireIsAdmin,
  productVariantController.updateProductVariants
);
router.patch(
  "/:id",
  requireIsAdmin,
  productVariantController.updateProductVariant
);
router.delete(
  "/:id",
  requireIsAdmin,
  productVariantController.deleteProductVariant
);
router.delete(
  "/:",
  requireIsAdmin,
  productVariantController.deleteProductVariants
);

export default router;
