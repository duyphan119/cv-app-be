import { Request, Response } from "express";
import { ResponseData } from "../utils/types";
import * as variantService from "../services/variant.service";

class VariantController {
  async getAllVariants(req: Request, res: Response) {
    const { data, status }: ResponseData = await variantService.getAllVariants(
      req.query
    );
    res.status(status).json(data);
  }
  async getVariantById(req: Request, res: Response) {
    const { data, status }: ResponseData = await variantService.getVariantById(
      +req.params.id
    );
    res.status(status).json(data);
  }
  async createVariant(req: Request, res: Response) {
    const { data, status }: ResponseData = await variantService.createVariant(
      req.body
    );
    res.status(status).json(data);
  }
  async createVariants(req: Request, res: Response) {
    const { data, status }: ResponseData = await variantService.createVariants(
      req.body
    );
    res.status(status).json(data);
  }
  async updateVariant(req: Request, res: Response) {
    const { data, status }: ResponseData = await variantService.updateVariant(
      +req.params.id,
      req.body
    );
    res.status(status).json(data);
  }
  async deleteVariant(req: Request, res: Response) {
    const { data, status }: ResponseData = await variantService.deleteVariant(
      +req.params.id
    );
    res.status(status).json(data);
  }
  async deleteVariants(req: Request, res: Response) {
    const { data, status }: ResponseData = await variantService.deleteVariants(
      req.body
    );
    res.status(status).json(data);
  }
}

const variantController = new VariantController();

export default variantController;
