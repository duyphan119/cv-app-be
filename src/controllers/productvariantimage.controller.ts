import { Request, Response } from "express";
import { ResponseData } from "../utils/types";
import * as productVariantImageService from "../services/productvariantimage.service";

class ProductVariantImageController {
  async getAllProductVariantImages(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await productVariantImageService.getAllProductVariantImages(req.query);
    res.status(status).json(data);
  }
  async createProductVariantImages(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await productVariantImageService.createProductVariantImages(req.body);
    res.status(status).json(data);
  }
  // async createVariant(req: Request, res: Response) {
  //   const { data, status }: ResponseData = await productVariantImageService.createVariant(
  //     req.body
  //   );
  //   res.status(status).json(data);
  // }
  // async createVariants(req: Request, res: Response) {
  //   const { data, status }: ResponseData = await productVariantImageService.createVariants(
  //     req.body
  //   );
  //   res.status(status).json(data);
  // }
  async updateProductVariantImage(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await productVariantImageService.updateProductVariantImage(
        parseInt(req.params.id),
        req.body.variantValueId
      );
    res.status(status).json(data);
  }
  async deleteProductVariantImage(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await productVariantImageService.deleteProductVariantImage(
        parseInt(req.params.id)
      );
    res.status(status).json(data);
  }
  // async deleteVariants(req: Request, res: Response) {
  //   const { data, status }: ResponseData = await productVariantImageService.deleteVariants(
  //     req.body
  //   );
  //   res.status(status).json(data);
  // }
}

const productVariantImageController = new ProductVariantImageController();

export default productVariantImageController;
