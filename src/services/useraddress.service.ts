import { STATUS_CREATED, STATUS_OK } from "../constants";
import { UserAddress } from "../entities/useraddress.entity";
import { handleError, handleItem, handleItems } from "../utils";
import { PaginationParams, ResponseData } from "../utils/types";

export type CreateUserAddressDTO = {
  userId: number;
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
    const take: number = query.limit ? parseInt(query.limit) : -1;
    const skip: number =
      take !== -1 && query.p ? (parseInt(query.p) - 1) * take : -1;
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
  body: CreateUserAddressDTO
): Promise<ResponseData> => {
  try {
    let userAddress = await UserAddress.save(
      Object.assign(new UserAddress(), body)
    );
    return handleItem(STATUS_CREATED, userAddress);
  } catch (error) {
    return handleError(error);
  }
};

export const updateUserAddress = async (
  id: number,
  body: Partial<CreateUserAddressDTO>
): Promise<ResponseData> => {
  try {
    let userAddress = await UserAddress.findOneBy({ id });
    if (userAddress) {
      userAddress = await UserAddress.save(Object.assign(userAddress, body));
    }
    return handleItem(STATUS_OK, userAddress);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteUserAddress = async (id: number): Promise<ResponseData> => {
  try {
    await UserAddress.delete({ id });
    return handleItem(STATUS_OK);
  } catch (error) {
    return handleError(error);
  }
};
