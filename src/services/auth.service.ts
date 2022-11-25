import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { ResponseData } from "../utils/types";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import {
  CheckEmailInput,
  GetResetCodeInput,
  ResetCode,
  ResetCodeIsVerified,
  ResetPasswordInput,
  VerifyResetCodeInput,
} from "../types/auth";
import { handleError, handleItem } from "../utils";
import { LoginDTO } from "../dtos/login.dto";
import { RegisterDTO } from "../dtos/register.dto";
import { STATUS_CREATED, STATUS_OK } from "../constants";
import { ChangeProfileDTO } from "../dtos/chaneprofile.dto";
import { ChangePasswordDTO } from "../dtos/changepassword.dto";
require("dotenv").config();

export const hash = async (raw: string): Promise<string> => {
  const salt = await bcrypt.genSalt(6);
  return bcrypt.hash(raw, salt);
};

export const signAccessToken = (obj: any, expiresIn: number): string => {
  return jwt.sign(obj, process.env.AT_SECRET as string, {
    expiresIn,
  });
};

export const signRefreshToken = (obj: any, expiresIn: number): string => {
  return jwt.sign(obj, process.env.RT_SECRET as string, {
    expiresIn,
  });
};

export const register = async (body: RegisterDTO): Promise<ResponseData> => {
  const { email, fullName, password } = body;
  try {
    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (existingUser)
      return {
        status: 403,
        data: { message: "Email is available" },
      };

    const hashedPassword = await hash(password);

    const newUser = new User();
    newUser.email = email;
    newUser.fullName = fullName;
    newUser.password = hashedPassword;

    const savedUser = await userRepository.save(newUser);
    const { password: _password, ...others } = savedUser;

    const obj: any = { id: others.id, isAdmin: others.isAdmin };

    const accessToken = signAccessToken(obj, 600000);

    const refreshToken = signRefreshToken(obj, 31536000000);
    return handleItem(STATUS_CREATED, {
      user: others,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return handleError(error);
  }
};

export const login = async (body: LoginDTO): Promise<ResponseData> => {
  const { email, password } = body;
  try {
    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (!existingUser)
      return {
        status: 403,
        data: { message: "Email is incorrect" },
      };
    const comparedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!comparedPassword)
      return {
        status: 403,
        data: { message: "Password is incorrect" },
      };

    const { password: _password, ...others } = existingUser;

    const obj: any = { id: others.id, isAdmin: others.isAdmin };

    const accessToken = signAccessToken(obj, 600000);

    const refreshToken = signRefreshToken(obj, 31536000000);
    return handleItem(STATUS_CREATED, {
      user: others,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return handleError(error);
  }
};

export const refreshToken = async (
  refreshToken: string
): Promise<ResponseData> => {
  try {
    const data = await jwt.verify(
      refreshToken,
      process.env.RT_SECRET as string
    );

    const accessToken = signAccessToken(data, 60000);
    return handleItem(STATUS_CREATED, { accessToken });
  } catch (error) {
    return handleError(error);
  }
};

export const checkEmail = async (
  query: CheckEmailInput
): Promise<ResponseData> => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOneBy({
      email: query.email,
    });
    if (existingUser) {
      return {
        status: 200,
        data: { message: "Email is correct" },
      };
    }
    return {
      status: 403,
      data: { message: "Email is incorrect" },
    };
  } catch (error) {
    return handleError(error);
  }
};

export const changeProfile = async (
  id: number,
  body: ChangeProfileDTO
): Promise<ResponseData> => {
  try {
    const user = await User.findOneBy({ id });
    if (user) {
      const updatedUser = await User.save(Object.assign(user, body));
      return handleItem(STATUS_OK, updatedUser);
    }
    return handleItem(403);
  } catch (error) {
    return handleError(error);
  }
};

export const getResetCode = async (
  body: GetResetCodeInput
): Promise<ResponseData> => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOneBy({
      email: body.email,
    });
    if (existingUser) {
      const code: string = Math.round(Math.random() * 9999).toString();
      await sendMailCode(body.email, code);
      const salt = await bcrypt.genSalt(6);
      const hashedCode = await bcrypt.hash(code, salt);
      console.log({ code });
      return {
        status: 200,
        data: { code: hashedCode },
      };
    }
    return {
      status: 403,
      data: { message: "Email is incorrect" },
    };
  } catch (error) {
    return handleError(error);
  }
};

export const verifyResetCode = async (
  resetCode: ResetCode,
  query: VerifyResetCodeInput
): Promise<ResponseData> => {
  try {
    const comparedResetCode = await bcrypt.compare(query.code, resetCode.code);
    if (
      comparedResetCode &&
      new Date().getTime() - resetCode.expiredIn < resetCode.time
    ) {
      return {
        status: 200,
        data: { message: "Your code is correct" },
      };
    }
    return {
      status: 403,
      data: { message: "Your code is incorrect" },
    };
  } catch (error) {
    return handleError(error);
  }
};
export const changePassword = async (
  userId: number,
  body: ChangePasswordDTO
): Promise<ResponseData> => {
  try {
    const user = await User.findOneBy({ id: userId });
    if (user) {
      const comparedPassword = await bcrypt.compare(
        body.oldPassword,
        user.password
      );
      if (comparedPassword) {
        return handleItem(
          200,
          await User.save({ ...user, password: await hash(body.newPassword) })
        );
      }
    }
    return handleItem(403);
  } catch (error) {
    return handleError(error);
  }
};

export const resetPassword = async (
  resetCode: ResetCodeIsVerified,
  body: ResetPasswordInput
): Promise<ResponseData> => {
  try {
    const comparedResetCode = await bcrypt.compare(body.code, resetCode.code);
    if (comparedResetCode && resetCode.isVerified) {
      const userRepository = AppDataSource.getRepository(User);

      const existingUser = await userRepository.findOneBy({
        email: resetCode.email,
      });

      if (existingUser) {
        const hashedPassword = await hash(body.newPassword);

        existingUser.password = hashedPassword;

        await userRepository.save(existingUser);

        return {
          status: 200,
          data: { message: "Reset password is successfully" },
        };
      }
    }
    return {
      status: 403,
      data: { message: "Your code is incorrect" },
    };
  } catch (error) {
    return handleError(error);
  }
};

async function sendMailCode(to: string, code: string) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.ethereal.email",
    secure: false,
    auth: {
      user: "duychomap123@gmail.com", // generated ethereal user
      pass: "toehietdmopkwibk", // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to, // list of receivers
    subject: "Change Password", // Subject line
    html: `<b>Your code: ${code}</b>`, // html body
  });
}
