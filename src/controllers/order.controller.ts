import { Request, Response } from "express";
import { ResponseData } from "../utils/types";
import * as orderService from "../services/order.service";

class OrderController {
  async createCartItem(req: Request, res: Response) {
    const { data, status }: ResponseData = await orderService.createCartItem(
      +res.locals.user.id,
      req.body
    );
    res.status(status).json(data);
  }
  async getCart(req: Request, res: Response) {
    const { data, status }: ResponseData = await orderService.getCart(
      +res.locals.user.id
    );
    res.status(status).json(data);
  }
  async updateCartItem(req: Request, res: Response) {
    const { data, status }: ResponseData = await orderService.updateCartItem(
      +res.locals.user.id,
      +req.params.productVariantId,
      req.body.newQuantity
    );
    res.status(status).json(data);
  }
  async deleteCartItem(req: Request, res: Response) {
    const { data, status }: ResponseData = await orderService.deleteCartItem(
      +res.locals.user.id,
      +req.params.productVariantId
    );
    res.status(status).json(data);
  }
  async checkout(req: Request, res: Response) {
    const { data, status }: ResponseData = await orderService.checkout(
      +res.locals.user.id,
      req.body
    );
    res.status(status).json(data);
  }
  async userOrders(req: Request, res: Response) {
    const { data, status }: ResponseData = await orderService.userOrders(
      +res.locals.user.id,
      req.query
    );
    res.status(status).json(data);
  }
}

const orderController = new OrderController();

export default orderController;
