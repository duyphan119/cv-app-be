import { Request, Response } from "express";
import { ResponseData } from "../utils/types";
import * as groupProductService from "../services/groupproduct.service";

class GroupProductController {
  async getAllGroupProducts(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await groupProductService.getAllGroupProducts(req.query);
    res.status(status).json(data);
  }
  async getGroupProductById(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await groupProductService.getGroupProductById(parseInt(req.params.id));
    res.status(status).json(data);
  }
  async createGroupProduct(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await groupProductService.createGroupProduct(req.body);
    res.status(status).json(data);
  }
  async createGroupProducts(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await groupProductService.createGroupProducts(req.body);
    res.status(status).json(data);
  }
  async updateGroupProduct(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await groupProductService.updateGroupProduct(
        parseInt(req.params.id),
        req.body
      );
    res.status(status).json(data);
  }
  async deleteGroupProduct(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await groupProductService.deleteGroupProduct(parseInt(req.params.id));
    res.status(status).json(data);
  }
  async softDeleteGroupProduct(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await groupProductService.softDeleteGroupProduct(parseInt(req.params.id));
    res.status(status).json(data);
  }
  async restoreGroupProduct(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await groupProductService.restoreGroupProduct(parseInt(req.params.id));
    res.status(status).json(data);
  }
  async deleteGroupProducts(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await groupProductService.deleteGroupProducts(req.body);
    res.status(status).json(data);
  }
}

const groupProductController = new GroupProductController();

export default groupProductController;
