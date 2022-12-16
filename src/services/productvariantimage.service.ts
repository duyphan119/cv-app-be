import { getCloudinary } from "../cloudinary";
import { STATUS_OK } from "../constants";
import { ProductVariantImage } from "../entities/productvariantimage.entity";
import { handleError, handleItem, handleItems } from "../utils";
import { QueryParams, ResponseData } from "../utils/types";
export type ProductVariantImageQueryParams = {
  productId?: string;
} & QueryParams;
export type CreateProductVariantImageDTO = {
  path: string;
  productId: number;
  variantValueId: number | null;
};
export const getAllProductVariantImages = async (
  query: ProductVariantImageQueryParams
): Promise<ResponseData> => {
  try {
    const { sort_by, sort_type, productId } = query;

    const take: number = query.limit ? parseInt(query.limit) : -1;
    const skip: number =
      take !== -1 && query.p ? (parseInt(query.p) - 1) * take : -1;

    const variants = await ProductVariantImage.find({
      order: {
        [sort_by || "id"]: sort_type || "desc",
      },
      where: {
        ...(productId ? { productId: +productId } : {}),
      },
      ...(take !== -1 ? { take } : {}),
      ...(skip !== -1 ? { skip } : {}),
    });

    const count = await ProductVariantImage.count();
    return handleItems(STATUS_OK, variants, count, take);
  } catch (error) {
    return handleError(error);
  }
};
export const createProductVariantImages = async (
  body: CreateProductVariantImageDTO[]
): Promise<ResponseData> => {
  try {
    const result = await ProductVariantImage.save(
      body.map((i: CreateProductVariantImageDTO) =>
        Object.assign(new ProductVariantImage(), i)
      )
    );
    return handleItems(STATUS_OK, result, result.length, result.length);
  } catch (error) {
    return handleError(error);
  }
};
export const updateProductVariantImage = async (
  id: number,
  variantValueId: number
) => {
  try {
    const item = await ProductVariantImage.findOneBy({ id });
    if (item) {
      const result = await ProductVariantImage.save(
        Object.assign(item, { variantValueId })
      );
      return handleItem(STATUS_OK, result);
    }
    const result = await ProductVariantImage.update({ variantValueId }, { id });

    return handleItem(result.affected && result.affected > 0 ? STATUS_OK : 500);
  } catch (error) {
    return handleError(error);
  }
};
export const deleteProductVariantImage = async (
  id: number
): Promise<ResponseData> => {
  try {
    const item = await ProductVariantImage.findOneBy({ id });
    if (item) {
      await getCloudinary().v2.uploader.destroy(
        "cv-app" + item.path.split("cv-app")[1].split(".")[0]
      );
      await ProductVariantImage.delete({ id: item.id });
    }
    return handleItem(STATUS_OK);
  } catch (error) {
    return handleError(error);
  }
};
