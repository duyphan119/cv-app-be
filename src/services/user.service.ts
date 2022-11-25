import { User } from "../entities/user.entity";
import { AppDataSource } from "../data-source";
import { ResponseData } from "../utils/types";
import { UsersQueryParams } from "../types/user";

export const getAllUsers = async (
  query: UsersQueryParams
): Promise<ResponseData> => {
  try {
    const { sort_by, sort_type } = query;
    const userRepository = AppDataSource.getRepository(User);

    const take: number = query.limit ? parseInt(query.limit) : 10;
    const skip: number = query.p ? (parseInt(query.p) - 1) * take : 0;

    const users = await userRepository.find({
      order: {
        [sort_by || "createdAt"]: sort_type || "desc",
      },
      take,
      skip,
    });

    const count = await userRepository.count();

    return {
      status: 200,
      data: {
        items: users,
        count,
        totalPage: Math.ceil(count / take),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: {
        message: `Something's wrong`,
        error,
      },
    };
  }
};

export const deleteUser = async (id: number): Promise<ResponseData> => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOneBy({
      id,
    });
    if (existingUser) {
      await userRepository.softDelete(id);
      return {
        status: 200,
        data: { message: "This record is deleted" },
      };
    }

    return {
      status: 400,
      data: {
        message: `User ID is not found`,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: {
        message: `Something's wrong`,
        error,
      },
    };
  }
};

export const getUserById = async (id: number): Promise<ResponseData> => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const existingUser = await userRepository.findOne({
      where: { id },
      select: {
        password: false,
      },
    });

    if (existingUser) {
      return {
        status: 200,
        data: existingUser,
      };
    }

    return {
      status: 200,
      data: {
        user: null,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: {
        message: `Something's wrong`,
        error,
      },
    };
  }
};
