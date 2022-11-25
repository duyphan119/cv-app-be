import { Request, Response } from "express";
import { ResponseData } from "../utils/types";
import * as productService from "../services/product.service";

class ProductController {
  async getAllProducts(req: Request, res: Response) {
    const { data, status }: ResponseData = await productService.getAllProducts(
      req.query
    );
    res.status(status).json(data);
  }
  async createFavoriteProduct(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await productService.createFavoriteProduct(
        +res.locals.user.id,
        req.body.productId
      );
    res.status(status).json(data);
  }
  async deleteFavoriteProduct(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await productService.deleteFavoriteProduct(
        +res.locals.user.id,
        +req.params.productId
      );
    res.status(status).json(data);
  }
  async getFavoriteProducts(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await productService.getFavoriteProducts(+res.locals.user.id, req.query);
    res.status(status).json(data);
  }
  async search(req: Request, res: Response) {
    const { data, status }: ResponseData = await productService.search(
      req.query
    );
    res.status(status).json(data);
  }
  async getProductById(req: Request, res: Response) {
    const { data, status }: ResponseData = await productService.getProductById(
      parseInt(req.params.id)
    );
    res.status(status).json(data);
  }
  async createProduct(req: Request, res: Response) {
    const { data, status }: ResponseData = await productService.createProduct(
      req.body
    );
    res.status(status).json(data);
  }
  async createProducts(req: Request, res: Response) {
    const { data, status }: ResponseData = await productService.createProducts(
      req.body
    );
    res.status(status).json(data);
  }
  async updateProduct(req: Request, res: Response) {
    const { data, status }: ResponseData = await productService.updateProduct(
      parseInt(req.params.id),
      req.body
    );
    res.status(status).json(data);
  }
  async deleteProduct(req: Request, res: Response) {
    const { data, status }: ResponseData = await productService.deleteProduct(
      parseInt(req.params.id)
    );
    res.status(status).json(data);
  }
  async deleteProducts(req: Request, res: Response) {
    const { data, status }: ResponseData = await productService.deleteProducts(
      req.body
    );
    res.status(status).json(data);
  }
}

const productController = new ProductController();

export default productController;
