import { GroupProduct } from "../entities/groupproduct.entity";
import { STATUS_CREATED, STATUS_OK } from "../constants";
import { Product } from "../entities/product.entity";
import { handleError, handleItem, handleItems } from "../utils";
import { QueryParams, ResponseData } from "../utils/types";
import { CreateGroupProductDTO } from "../dtos/creategroupproduct.dto";
import slugify from "slugify";
import { AppDataSource } from "../data-source";

export type GroupProductQueryParams = {
  name?: string;
  slug?: string;
} & QueryParams;

export const getAllGroupProducts = async (
  query: GroupProductQueryParams
): Promise<ResponseData> => {
  try {
    const { sortBy, sortType, name, slug, withDeleted } = query;
    const take: number = query.limit ? +query.limit : -1;
    const skip: number = take !== -1 && query.p ? (+query.p - 1) * take : -1;

    const products = await GroupProduct.find({
      order: {
        [sortBy || "id"]: sortType || "desc",
      },
      where: { ...(name ? { name } : {}), ...(slug ? { slug } : {}) },
      withDeleted: withDeleted ? true : false,
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
    const { name } = body;
    let slug =
      body.slug ||
      slugify(name, {
        trim: true,
        locale: "vi",
        lower: true,
      });
    const groupProduct = await GroupProduct.save(
      Object.assign(new GroupProduct(), { ...body, slug })
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

export const softDeleteGroupProduct = async (
  id: number
): Promise<ResponseData> => {
  try {
    await AppDataSource.getRepository(GroupProduct).softDelete({ id });
    return handleItem(STATUS_OK);
  } catch (error) {
    return handleError(error);
  }
};

export const restoreGroupProduct = async (
  id: number
): Promise<ResponseData> => {
  try {
    await AppDataSource.getRepository(GroupProduct).restore({ id });
    return handleItem(STATUS_OK);
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
