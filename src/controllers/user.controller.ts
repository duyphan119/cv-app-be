import { Request, Response } from "express";
import { ResponseData } from "../utils/types";
import * as userService from "../services/user.service";

class UserController {
  async getAllUsers(req: Request, res: Response) {
    const { data, status }: ResponseData = await userService.getAllUsers(
      req.query
    );
    res.status(status).json(data);
  }
  async getUserById(req: Request, res: Response) {
    const { data, status }: ResponseData = await userService.getUserById(
      parseInt(req.params.id)
    );
    res.status(status).json(data);
  }

  async deleteUser(req: Request, res: Response) {
    const { data, status }: ResponseData = await userService.deleteUser(
      parseInt(req.params.id)
    );
    res.status(status).json(data);
  }
}

const userController = new UserController();

export default userController;
