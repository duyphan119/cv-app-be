import { Router } from "express";
import variantController from "../../controllers/variant.controller";
import { requireIsAdmin } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/:id", variantController.getVariantById);
router.get("/", variantController.getAllVariants);
router.post("/many", requireIsAdmin, variantController.createVariants);
router.post("/", requireIsAdmin, variantController.createVariant);
router.patch("/:id", requireIsAdmin, variantController.updateVariant);
router.delete("/:id", requireIsAdmin, variantController.deleteVariant);
router.delete("/", requireIsAdmin, variantController.deleteVariants);

export default router;
