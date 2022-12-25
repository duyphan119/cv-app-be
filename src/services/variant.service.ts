import { CreateVariantDTO } from "../dtos/createvariant.dto";
import { STATUS_CREATED, STATUS_OK } from "../constants";
import { AppDataSource } from "../data-source";
import { Variant } from "../entities/variant.entity";
import { handleError, handleItems, handleItem } from "../utils";
import { QueryParams, ResponseData } from "../utils/types";

export type VariantQueryParams = {
  name?: string;
  variant_values?: string;
} & QueryParams;

export const getAllVariants = async (
  query: VariantQueryParams
): Promise<ResponseData> => {
  try {
    const { sortBy, sortType, name, variant_values } = query;
    const variantRepository = AppDataSource.getRepository(Variant);

    const take: number = query.limit ? +query.limit : -1;
    const skip: number = take !== -1 && query.p ? (+query.p - 1) * take : -1;
    const [variants, count] = await variantRepository.findAndCount({
      order: {
        [sortBy || "id"]: sortType || "desc",
      },
      where: {
        ...(name ? { name } : {}),
      },
      relations: {
        ...(variant_values ? { variantValues: true } : {}),
      },
      ...(take !== -1 ? { take } : {}),
      ...(skip !== -1 ? { skip } : {}),
    });

    return handleItems(STATUS_OK, variants, count, take);
  } catch (error) {
    return handleError(error);
  }
};

export const getVariantById = async (id: number): Promise<ResponseData> => {
  try {
    const variantRepository = AppDataSource.getRepository(Variant);

    const variant = await variantRepository.findOne({ where: { id } });

    return handleItem(STATUS_OK, variant);
  } catch (error) {
    return handleError(error);
  }
};

export const createVariant = async (
  body: CreateVariantDTO
): Promise<ResponseData> => {
  try {
    const variantRepository = AppDataSource.getRepository(Variant);

    const variant = await variantRepository.save(
      Object.assign(new Variant(), body)
    );
    return handleItem(STATUS_CREATED, variant);
  } catch (error) {
    return handleError(error);
  }
};

export const createVariants = async (
  body: CreateVariantDTO[]
): Promise<ResponseData> => {
  try {
    const variantRepository = AppDataSource.getRepository(Variant);

    const variant = await variantRepository.save(
      body.map((dto) => Object.assign(new Variant(), dto))
    );
    return handleItem(STATUS_CREATED, variant);
  } catch (error) {
    return handleError(error);
  }
};

export const updateVariant = async (
  id: number,
  body: Variant
): Promise<ResponseData> => {
  try {
    const variantRepository = AppDataSource.getRepository(Variant);
    let variant = await variantRepository.findOne({ where: { id } });
    if (variant)
      variant = await variantRepository.save(Object.assign(variant, body));
    return handleItem(STATUS_OK, variant);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteVariant = async (id: number): Promise<ResponseData> => {
  try {
    const variantRepository = AppDataSource.getRepository(Variant);
    await variantRepository.delete({ id });
    return handleItem(STATUS_OK);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteVariants = async (ids: number[]): Promise<ResponseData> => {
  try {
    const variantRepository = AppDataSource.getRepository(Variant);
    await variantRepository.delete(ids);
    return handleItem(STATUS_OK);
  } catch (error) {
    return handleError(error);
  }
};
