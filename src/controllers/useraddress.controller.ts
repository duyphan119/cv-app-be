import { Request, Response } from "express";
import { ResponseData } from "../utils/types";
import * as userAddressService from "../services/useraddress.service";

class UserAddressController {
  async getByUserId(req: Request, res: Response) {
    const { data, status }: ResponseData = await userAddressService.getByUserId(
      +res.locals.user.id,
      req.query
    );
    res.status(status).json(data);
  }
  async createUserAddress(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await userAddressService.createUserAddress(+res.locals.user.id, req.body);
    res.status(status).json(data);
  }
  async updateUserAddress(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await userAddressService.updateUserAddress(
        +req.params.id,
        +res.locals.user.id,
        req.body
      );
    res.status(status).json(data);
  }
  async deleteUserAddress(req: Request, res: Response) {
    const { data, status }: ResponseData =
      await userAddressService.deleteUserAddress(
        +req.params.id,
        +res.locals.user.id
      );
    res.status(status).json(data);
  }
}

const userAddressController = new UserAddressController();

export default userAddressController;
