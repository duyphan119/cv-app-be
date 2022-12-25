import { Request, Response } from "express";
import { ResponseData } from "../utils/types";
import * as orderService from "../services/order.service";

class OrderController {
  async getAllOrders(req: Request, res: Response) {
    const { data, status }: ResponseData = await orderService.getAllOrders(
      req.query
    );
    res.status(status).json(data);
  }
  async getOrderById(req: Request, res: Response) {
    const { data, status }: ResponseData = await orderService.getOrderById(
      +req.params.id
    );
    res.status(status).json(data);
  }
  async updateStatus(req: Request, res: Response) {
    const { data, status }: ResponseData = await orderService.updateStatus(
      +req.params.id,
      req.body.status
    );
    res.status(status).json(data);
  }
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
      +req.params.id,
      req.body.newQuantity
    );
    res.status(status).json(data);
  }
  async deleteCartItem(req: Request, res: Response) {
    const { data, status }: ResponseData = await orderService.deleteCartItem(
      +req.params.id
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
  async getOrdersByUserId(req: Request, res: Response) {
    const { data, status }: ResponseData = await orderService.getOrdersByUserId(
      +res.locals.user.id,
      req.query
    );
    res.status(status).json(data);
  }
}

const orderController = new OrderController();

export default orderController;
