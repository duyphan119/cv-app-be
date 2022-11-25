import { Router } from "express";
import groupProductController from "../../controllers/groupproduct.controller";
import { requireIsAdmin } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/:id", groupProductController.getGroupProductById);
router.get("/", groupProductController.getAllGroupProducts);
router.post(
  "/many",
  requireIsAdmin,
  groupProductController.createGroupProducts
);
router.post("/", requireIsAdmin, groupProductController.createGroupProduct);
router.patch("/:id", requireIsAdmin, groupProductController.updateGroupProduct);
router.delete(
  "/:id",
  requireIsAdmin,
  groupProductController.deleteGroupProduct
);
router.delete("/:", requireIsAdmin, groupProductController.deleteGroupProducts);

export default router;
