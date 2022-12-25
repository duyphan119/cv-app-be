import { STATUS_CREATED, STATUS_OK, STATUS_UNAUTH } from "../constants";
import { UserAddress } from "../entities/useraddress.entity";
import { handleError, handleItem, handleItems } from "../utils";
import { PaginationParams, ResponseData } from "../utils/types";

export type CreateUserAddressDTO = {
  province: string;
  district: string;
  ward: string;
  address: string;
};

export const getByUserId = async (
  userId: number,
  query: PaginationParams
): Promise<ResponseData> => {
  try {
    const take: number = query.limit ? +query.limit : -1;
    const skip: number = take !== -1 && query.p ? (+query.p - 1) * take : -1;
    const [userAddresses, count] = await UserAddress.findAndCount({
      where: { userId },
      ...(take !== -1 ? { take } : {}),
      ...(skip !== -1 ? { skip } : {}),
    });
    return handleItems(STATUS_OK, userAddresses, count, take);
  } catch (error) {
    return handleError(error);
  }
};

export const createUserAddress = async (
  userId: number,
  body: CreateUserAddressDTO
): Promise<ResponseData> => {
  try {
    console.log(
      Object.assign(new UserAddress(), Object.assign(body, { userId }))
    );
    let userAddress = await UserAddress.save({ ...body, userId });
    console.log(userAddress);
    return handleItem(STATUS_CREATED, userAddress);
  } catch (error) {
    return handleError(error);
  }
};

export const updateUserAddress = async (
  id: number,
  userId: number,
  body: Partial<CreateUserAddressDTO>
): Promise<ResponseData> => {
  try {
    let userAddress = await UserAddress.findOneBy({ id, userId });
    if (userAddress) {
      userAddress = await UserAddress.save(Object.assign(userAddress, body));
      return handleItem(STATUS_OK, userAddress);
    }
    return handleItem(STATUS_UNAUTH);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteUserAddress = async (
  id: number,
  userId: number
): Promise<ResponseData> => {
  try {
    let userAddress = await UserAddress.findOneBy({ id, userId });
    if (userAddress) {
      await UserAddress.delete({ id: userAddress.id });
      return handleItem(STATUS_OK);
    }
    return handleItem(STATUS_UNAUTH);
  } catch (error) {
    return handleError(error);
  }
};
