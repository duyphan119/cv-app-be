import { GroupProduct } from "../entities/groupproduct.entity";
import { STATUS_CREATED, STATUS_OK } from "../constants";
import { Product } from "../entities/product.entity";
import { handleError, handleItem, handleItems } from "../utils";
import { QueryParams, ResponseData } from "../utils/types";
import { CreateGroupProductDTO } from "../dtos/creategroupproduct.dto";

export type GroupProductQueryParams = {
  name?: string;
  slug?: string;
} & QueryParams;

export const getAllGroupProducts = async (
  query: GroupProductQueryParams
): Promise<ResponseData> => {
  try {
    const { sort_by, sort_type, name, slug } = query;
    const take: number = query.limit ? parseInt(query.limit) : -1;
    const skip: number =
      take !== -1 && query.p ? (parseInt(query.p) - 1) * take : -1;

    const products = await GroupProduct.find({
      order: {
        [sort_by || "createdAt"]: sort_type || "desc",
      },
      where: { ...(name ? { name } : {}), ...(slug ? { slug } : {}) },
      ...(take !== -1 ? { take } : {}),
      ...(skip !== -1 ? { skip } : {}),
    });
    const count = await GroupProduct.count({
      where: { ...(name ? { name } : {}), ...(slug ? { slug } : {}) },
    });
    return handleItems(STATUS_OK, products, count, take);
  } catch (error) {
    return handleError(error);
  }
};

export const getGroupProductById = async (
  id: number
): Promise<ResponseData> => {
  try {
    const groupProduct = await GroupProduct.findOne({ where: { id } });

    return handleItem(STATUS_OK, groupProduct);
  } catch (error) {
    return handleError(error);
  }
};

export const createGroupProduct = async (
  body: CreateGroupProductDTO
): Promise<ResponseData> => {
  try {
    const groupProduct = await GroupProduct.save(
      Object.assign(new Product(), body)
    );
    return handleItem(STATUS_CREATED, groupProduct);
  } catch (error) {
    return handleError(error);
  }
};

export const createGroupProducts = async (
  body: CreateGroupProductDTO[]
): Promise<ResponseData> => {
  try {
    const groupProducts = await GroupProduct.save(
      body.map((dto) => Object.assign(new Product(), dto))
    );
    return handleItem(STATUS_CREATED, groupProducts);
  } catch (error) {
    return handleError(error);
  }
};

export const updateGroupProduct = async (
  id: number,
  body: Product
): Promise<ResponseData> => {
  try {
    let groupProduct = await GroupProduct.findOne({ where: { id } });
    if (groupProduct)
      groupProduct = await GroupProduct.save(Object.assign(groupProduct, body));
    return handleItem(STATUS_OK, groupProduct);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteGroupProduct = async (id: number): Promise<ResponseData> => {
  try {
    await GroupProduct.delete({ id });
    return handleItem(STATUS_OK);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteGroupProducts = async (
  ids: number[]
): Promise<ResponseData> => {
  try {
    await GroupProduct.delete(ids);
    return handleItem(STATUS_OK);
  } catch (error) {
    return handleError(error);
  }
};
