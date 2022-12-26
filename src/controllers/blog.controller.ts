import { Request, Response } from "express";
import { ResponseData } from "../utils/types";
import * as blogService from "../services/blog.service";

class BlogController {
  async getAllBlogs(req: Request, res: Response) {
    const { data, status }: ResponseData = await blogService.getAllBlogs(
      res.locals.user.isAdmin,
      req.query
    );
    res.status(status).json(data);
  }

  async getBlogById(req: Request, res: Response) {
    const { data, status }: ResponseData = await blogService.getBlogById(
      +req.params.id
    );
    res.status(status).json(data);
  }
  async createBlog(req: Request, res: Response) {
    const { data, status }: ResponseData = await blogService.createBlog(
      +res.locals.user.id,
      req.body
    );
    res.status(status).json(data);
  }
  async updateBlog(req: Request, res: Response) {
    const { data, status }: ResponseData = await blogService.updateBlog(
      +req.params.id,
      +res.locals.user.id,
      req.body
    );
    res.status(status).json(data);
  }
  async softDeleteBlog(req: Request, res: Response) {
    const { data, status }: ResponseData = await blogService.softDeleteBlog(
      +req.params.id
    );
    res.status(status).json(data);
  }
  async restoreBlog(req: Request, res: Response) {
    const { data, status }: ResponseData = await blogService.restoreBlog(
      +req.params.id
    );
    res.status(status).json(data);
  }
  async deleteBlog(req: Request, res: Response) {
    const { data, status }: ResponseData = await blogService.deleteBlog(
      +req.params.id
    );
    res.status(status).json(data);
  }
  // async deleteBlogs(req: Request, res: Response) {
  //   const { data, status }: ResponseData = await blogService.deleteBlogs(
  //     req.body
  //   );
  //   res.status(status).json(data);
  // }
}

const blogController = new BlogController();

export default blogController;
