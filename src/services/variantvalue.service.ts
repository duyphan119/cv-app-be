import { STATUS_CREATED, STATUS_OK } from "../constants";
import { AppDataSource } from "../data-source";
import { VariantValue } from "../entities/variantvalue.entity";
import { handleError, handleItems, handleItem } from "../utils";
import { QueryParams, ResponseData } from "../utils/types";

export type CreateVariantValueDTO = {
  value: string;
  variantId: number;
};

export type VariantValueQueryParams = {
  value?: string;
  type?: string;
} & QueryParams;

export const getAllVariantValues = async (
  query: VariantValueQueryParams
): Promise<ResponseData> => {
  try {
    const { sort_by, sort_type, type } = query;
    const variantValueRepository = AppDataSource.getRepository(VariantValue);

    const take: number = query.limit ? parseInt(query.limit) : -1;
    const skip: number =
      take !== -1 && query.p ? (parseInt(query.p) - 1) * take : -1;
    const [variantValues, count] = await variantValueRepository.findAndCount({
      order: {
        [sort_by || "id"]: sort_type || "desc",
      },
      where: {
        ...(type ? { variant: { name: type } } : {}),
      },
      relations: {
        variant: true,
      },
      ...(take !== -1 ? { take } : {}),
      ...(skip !== -1 ? { skip } : {}),
    });

    return handleItems(STATUS_OK, variantValues, count, take);
  } catch (error) {
    return handleError(error);
  }
};

export const getVariantValueById = async (
  id: number
): Promise<ResponseData> => {
  try {
    const variantValueRepository = AppDataSource.getRepository(VariantValue);

    const variantValue = await variantValueRepository.findOne({
      where: { id },
    });

    return handleItem(STATUS_OK, variantValue);
  } catch (error) {
    return handleError(error);
  }
};

export const createVariantValue = async (
  body: CreateVariantValueDTO
): Promise<ResponseData> => {
  try {
    const variantValueRepository = AppDataSource.getRepository(VariantValue);

    const variantValue = await variantValueRepository.save(
      Object.assign(new VariantValue(), body)
    );
    return handleItem(STATUS_CREATED, variantValue);
  } catch (error) {
    return handleError(error);
  }
};

export const createVariantValues = async (
  body: CreateVariantValueDTO[]
): Promise<ResponseData> => {
  try {
    const variantValueRepository = AppDataSource.getRepository(VariantValue);

    const variantValue = await variantValueRepository.save(
      body.map((dto) => Object.assign(new VariantValue(), dto))
    );
    return handleItem(STATUS_CREATED, variantValue);
  } catch (error) {
    return handleError(error);
  }
};

export const updateVariantValue = async (
  id: number,
  body: VariantValue
): Promise<ResponseData> => {
  try {
    const variantValueRepository = AppDataSource.getRepository(VariantValue);
    let variantValue = await variantValueRepository.findOne({ where: { id } });
    if (variantValue)
      variantValue = await variantValueRepository.save(
        Object.assign(variantValue, body)
      );
    return handleItem(STATUS_OK, variantValue);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteVariantValue = async (id: number): Promise<ResponseData> => {
  try {
    const variantValueRepository = AppDataSource.getRepository(VariantValue);
    await variantValueRepository.delete({ id });
    return handleItem(STATUS_OK);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteVariantValues = async (
  ids: number[]
): Promise<ResponseData> => {
  try {
    const variantValueRepository = AppDataSource.getRepository(VariantValue);
    await variantValueRepository.delete(ids);
    return handleItem(STATUS_OK);
  } catch (error) {
    return handleError(error);
  }
};
