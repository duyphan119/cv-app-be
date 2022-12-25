import { Request, Response } from "express";
import { ResponseData } from "../utils/types";
import * as orderDiscountService from "../services/orderdiscount.service";

class OrderDiscountController {
  async getAllOrderDiscounts(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await orderDiscountService.getAllOrderDiscounts(req.query);
    res.status(status).json(data);
  }
  async check(req: Request, res: Response) {
    const { code, total } = req.query;
    const { data, status }: ResponseData = await orderDiscountService.check(
      +res.locals.user.id,
      `${code}`,
      +`${total}`
    );
    res.status(status).json(data);
  }
  async createOrderDiscount(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await orderDiscountService.createOrderDiscount(req.body);
    res.status(status).json(data);
  }
}

const orderDiscountController = new OrderDiscountController();

export default orderDiscountController;
