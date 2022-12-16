import { Router } from "express";
import productController from "../../controllers/product.controller";
import {
  requireIsAdmin,
  requireLogin,
} from "../../middlewares/auth.middleware";

const router = Router();

router.get("/favorite", requireLogin, productController.getFavoriteProducts);
router.get("/search", productController.search);
router.get("/:id", productController.getProductById);
router.get("/", productController.getAllProducts);
router.post("/many", requireIsAdmin, productController.createProducts);
router.post("/favorite", requireLogin, productController.createFavoriteProduct);
router.post("/", requireIsAdmin, productController.createProduct);
router.patch(
  "/thumbnail/:id",
  requireIsAdmin,
  productController.updateProductThumbnail
);
router.patch("/:id", requireIsAdmin, productController.updateProduct);
router.delete(
  "/favorite/:productId",
  requireLogin,
  productController.deleteFavoriteProduct
);
router.delete("/soft/:id", requireIsAdmin, productController.softDeleteProduct);
router.delete("/restore/:id", requireIsAdmin, productController.restoreProduct);
router.delete("/:id", requireIsAdmin, productController.deleteProduct);
router.delete("/:", requireIsAdmin, productController.deleteProducts);

export default router;
