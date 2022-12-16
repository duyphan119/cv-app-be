import { Router } from "express";
import variantValueController from "../../controllers/variantvalue.controller";
import { requireIsAdmin } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/:id", variantValueController.getVariantValueById);
router.get("/", variantValueController.getAllVariantValues);
router.post(
  "/many",
  requireIsAdmin,
  variantValueController.createVariantValues
);
router.post("/", requireIsAdmin, variantValueController.createVariantValue);
router.patch("/:id", requireIsAdmin, variantValueController.updateVariantValue);
router.delete(
  "/:id",
  requireIsAdmin,
  variantValueController.deleteVariantValue
);
router.delete("/", requireIsAdmin, variantValueController.deleteVariantValues);

export default router;
