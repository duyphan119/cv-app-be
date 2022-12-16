import { Request, Response } from "express";
import { ResponseData } from "../utils/types";
import * as variantValueService from "../services/variantvalue.service";

class VariantValueController {
  async getAllVariantValues(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await variantValueService.getAllVariantValues(req.query);
    res.status(status).json(data);
  }
  async getVariantValueById(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await variantValueService.getVariantValueById(parseInt(req.params.id));
    res.status(status).json(data);
  }
  async createVariantValue(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await variantValueService.createVariantValue(req.body);
    res.status(status).json(data);
  }
  async createVariantValues(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await variantValueService.createVariantValues(req.body);
    res.status(status).json(data);
  }
  async updateVariantValue(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await variantValueService.updateVariantValue(
        parseInt(req.params.id),
        req.body
      );
    res.status(status).json(data);
  }
  async deleteVariantValue(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await variantValueService.deleteVariantValue(parseInt(req.params.id));
    res.status(status).json(data);
  }
  async deleteVariantValues(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await variantValueService.deleteVariantValues(req.body);
    res.status(status).json(data);
  }
}

const variantValueController = new VariantValueController();

export default variantValueController;
