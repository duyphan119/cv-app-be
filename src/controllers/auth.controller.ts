import { Request, Response } from "express";
import { ResponseData } from "../utils/types";
import {
  COOKIE_REFRESH_TOKEN_NAME,
  COOKIE_RESET_CODE_NAME,
  __prod__,
} from "../constants";
import * as authService from "../services/auth.service";
import * as userService from "../services/user.service";

class AuthController {
  async register(req: Request, res: Response) {
    const { data, status }: ResponseData = await authService.register(req.body);

    if (status === 201) {
      const { refreshToken, ...others }: any = data;
      res.cookie(COOKIE_REFRESH_TOKEN_NAME, refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        secure: __prod__,
        sameSite: "lax",
        domain: __prod__ ? ".vercel.app" : undefined,
      });
      return res.status(status).json(others);
    }

    return res.status(status).json(data);
  }

  async login(req: Request, res: Response) {
    const { data, status }: ResponseData = await authService.login(req.body);

    if (status === 201) {
      const { refreshToken, ...others }: any = data.data;
      res.cookie(COOKIE_REFRESH_TOKEN_NAME, refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        secure: __prod__,
        sameSite: "lax",
        domain: __prod__ ? ".vercel.app" : undefined,
      });
      console.log({ ...data, data: others });
      return res.status(status).json({ ...data, data: others });
    }

    return res.status(status).json(data);
  }
  async refreshToken(req: Request, res: Response) {
    if (req.cookies[COOKIE_REFRESH_TOKEN_NAME]) {
      const { data, status }: ResponseData = await authService.refreshToken(
        req.cookies[COOKIE_REFRESH_TOKEN_NAME]
      );
      return res.status(status).json(data);
    } else {
      return res.status(401).json({ message: `Login now` });
    }
  }
  async changeProfile(req: Request, res: Response) {
    const { data, status }: ResponseData = await authService.changeProfile(
      res.locals.user.id,
      req.body
    );
    return res.status(status).json(data);
  }
  logout(req: Request, res: Response) {
    res.clearCookie(COOKIE_REFRESH_TOKEN_NAME);
    res.status(201).json({ data: { message: "Log out success" } });
  }
  async getProfile(req: Request, res: Response) {
    const { data, status }: ResponseData = await userService.getUserById(
      res.locals.user.id || ""
    );
    res.status(status).json(data);
  }
  async changePassword(req: Request, res: Response) {
    const { data, status }: ResponseData = await authService.changePassword(
      +res.locals.user.id,
      req.body
    );
    res.status(status).json(data);
  }
  async checkEmail(req: Request, res: Response) {
    const { data, status }: ResponseData = await authService.checkEmail(
      req.query as any
    );
    res.status(status).json(data);
  }
  async getResetCode(req: Request, res: Response) {
    const { data, status }: ResponseData = await authService.getResetCode(
      req.body
    );
    const { code }: any = data;
    if (code) {
      res.cookie(
        COOKIE_RESET_CODE_NAME,
        {
          code,
          expiredIn: 100 * 1000,
          time: new Date().getTime(),
          email: req.body.email,
        },
        {
          httpOnly: true,
          secure: __prod__,
          sameSite: "lax",
          domain: __prod__ ? ".vercel.app" : undefined,
        }
      );

      res.status(status).json({
        message: "Your code is sended to your email",
      });
    } else {
      res.status(status).json(data);
    }
  }
  async verifyResetCode(req: Request, res: Response) {
    const { data, status }: ResponseData = await authService.verifyResetCode(
      req.cookies[COOKIE_RESET_CODE_NAME],
      req.query as any
    );
    if (status === 200) {
      res.cookie(
        COOKIE_RESET_CODE_NAME,
        {
          code: req.cookies[COOKIE_RESET_CODE_NAME].code,
          isVerified: true,
          email: req.cookies[COOKIE_RESET_CODE_NAME].email,
        },
        {
          httpOnly: true,
          secure: __prod__,
          sameSite: "lax",
          domain: __prod__ ? ".vercel.app" : undefined,
        }
      );
    }
    res.status(status).json(data);
  }
  async resetPassword(req: Request, res: Response) {
    const { data, status }: ResponseData = await authService.resetPassword(
      req.cookies[COOKIE_RESET_CODE_NAME],
      req.body
    );
    if (status === 200) {
      res.clearCookie(COOKIE_RESET_CODE_NAME);
      res.status(status).json({
        message: "Reset password is successfully",
      });
    } else {
      res.status(status).json(data);
    }
  }
}

const authController = new AuthController();

export default authController;
