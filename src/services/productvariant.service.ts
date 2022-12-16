import { STATUS_OK, STATUS_CREATED } from "../constants";
import { ProductVariant } from "../entities/productvariant.entity";
import { handleError, handleItem, handleItems } from "../utils";
import { QueryParams, ResponseData } from "../utils/types";

export type ProductVariantQueryParams = {
  productId?: string;
  variant_values?: string;
} & QueryParams;

export type CreateProductVariantDTO = {
  productId: number;
  price: number;
  inventory: number;
};

export const getAllProductVariants = async (
  query: ProductVariantQueryParams
): Promise<ResponseData> => {
  try {
    const { productId, sort_by, sort_type, limit, p, variant_values } = query;
    const take: number = limit ? parseInt(limit) : -1;
    const skip: number = take !== -1 && p ? (parseInt(p) - 1) * take : -1;
    const [productVariants, count] = await ProductVariant.findAndCount({
      order: {
        [sort_by || "id"]: sort_type || "desc",
      },
      where: {
        ...(productId ? { productId: +productId } : {}),
      },
      relations: {
        ...(variant_values ? { variantValues: true } : {}),
      },
      ...(take !== -1 ? { take } : {}),
      ...(skip !== -1 ? { skip } : {}),
    });
    return handleItems(STATUS_OK, productVariants, count, take);
  } catch (error) {
    return handleError(error);
  }
};
export const getProductVariantById = async (
  id: number
): Promise<ResponseData> => {
  try {
    const productVariant = await ProductVariant.findOneBy({ id });
    return handleItem(STATUS_OK, productVariant);
  } catch (error) {
    return handleError(error);
  }
};

export const createProductVariant = async (
  body: CreateProductVariantDTO
): Promise<ResponseData> => {
  try {
    return handleItem(
      STATUS_CREATED,
      await ProductVariant.save(Object.assign(new ProductVariant(), body))
    );
  } catch (error) {
    return handleError(error);
  }
};

export const createProductVariants = async (
  body: CreateProductVariantDTO[]
): Promise<ResponseData> => {
  try {
    await ProductVariant.save(
      body.map((dto: CreateProductVariantDTO) =>
        Object.assign(new ProductVariant(), dto)
      )
    );
    return handleItem(STATUS_OK);
  } catch (error) {
    return handleError(error);
  }
};

export const updateProductVariant = async (
  id: number,
  body: CreateProductVariantDTO
): Promise<ResponseData> => {
  try {
    await ProductVariant.update(body, { id });
    return handleItem(STATUS_OK);
  } catch (error) {
    return handleError(error);
  }
};

export const updateProductVariants = async (
  body: ProductVariant[]
): Promise<ResponseData> => {
  try {
    await ProductVariant.save(body);
    return handleItem(STATUS_OK);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteProductVariant = async (
  id: number
): Promise<ResponseData> => {
  try {
    await ProductVariant.delete({ id });
    return handleItem(STATUS_OK);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteProductVariants = async (
  ids: number[]
): Promise<ResponseData> => {
  try {
    await ProductVariant.delete(ids);
    return handleItem(STATUS_OK);
  } catch (error) {
    return handleError(error);
  }
};
