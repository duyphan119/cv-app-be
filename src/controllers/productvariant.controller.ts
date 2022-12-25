import { Request, Response } from "express";
import { ResponseData } from "../utils/types";
import * as productVariantService from "../services/productvariant.service";

class ProductVariantController {
  async getAllProductVariants(req: Request, res: Response) {
    console.log("GET ALL:::::::::::::::::");
    const { data, status }: ResponseData =
      await productVariantService.getAllProductVariants(req.query);
    res.status(status).json(data);
  }
  async getProductVariantById(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await productVariantService.getProductVariantById(+req.params.id);
    res.status(status).json(data);
  }
  async createProductVariant(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await productVariantService.createProductVariant(req.body);
    res.status(status).json(data);
  }
  async createProductVariants(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await productVariantService.createProductVariants(req.body.inputs);
    res.status(status).json(data);
  }
  async updateProductVariant(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await productVariantService.updateProductVariant(
        +req.params.id,
        req.body.variantValueId
      );
    res.status(status).json(data);
  }
  async updateProductVariants(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await productVariantService.updateProductVariants(
        req.body.productVariants
      );
    res.status(status).json(data);
  }
  async deleteProductVariant(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await productVariantService.deleteProductVariant(+req.params.id);
    res.status(status).json(data);
  }
  async deleteProductVariants(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await productVariantService.deleteProductVariants(req.body);
    res.status(status).json(data);
  }
}

const productVariantController = new ProductVariantController();

export default productVariantController;
