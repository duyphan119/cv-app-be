import { FavoriteProduct } from "../entities/favoriteproduct.entity";
import { Between, In, LessThanOrEqual, Like, MoreThanOrEqual } from "typeorm";
import { STATUS_CREATED, STATUS_OK } from "../constants";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/product.entity";
import { handleError, handleItem, handleItems } from "../utils";
import { PaginationParams, QueryParams, ResponseData } from "../utils/types";
import { ProductVariant } from "../entities/productvariant.entity";
import slugify from "slugify";
import { ProductVariantImage } from "../entities/productvariantimage.entity";
import { getCloudinary } from "../cloudinary";

export type RelationQueryParams = {
  product_variants?: string;
  images?: string;
};

export type ProductQueryParams = {
  name?: string;
  slug?: string;
  group_product_slug?: string;
  v_ids?: string;
  min_price?: string;
  max_price?: string;
} & QueryParams &
  RelationQueryParams;

export type SearchProductQueryParams = {
  q?: string;
} & QueryParams &
  RelationQueryParams;

export type CreateProductDTO = {
  name: string;
  slug?: string;
  groupProductId: number;
  thumbnail?: number;
  description?: string;
  detail?: string;
  price: number;
  inventory: number;
};

export const minPrice = (product: Product) => {
  let min = 0;
  for (let i = 1; i < product.productVariants.length; i++) {
    if (product.productVariants[min].price > product.productVariants[i].price)
      min = i;
  }
  return product.productVariants[min].price;
};

export const maxPrice = (product: Product) => {
  let max = 0;
  for (let i = 1; i < product.productVariants.length; i++) {
    if (product.productVariants[max].price < product.productVariants[i].price)
      max = i;
  }
  return product.productVariants[max].price;
};
export const getAllProducts = async (
  query: ProductQueryParams
): Promise<ResponseData> => {
  try {
    const {
      sort_by,
      sort_type,
      name,
      slug,
      group_product_slug,
      min_price,
      max_price,
      v_ids,
      product_variants,
      images,
      withDeleted,
    } = query;
    const take: number = query.limit ? parseInt(query.limit) : -1;
    const skip: number =
      take !== -1 && query.p ? (parseInt(query.p) - 1) * take : -1;
    let [products, count] = await Product.findAndCount({
      withDeleted: withDeleted ? true : false,
      order: {
        ...(sort_by !== "price"
          ? { [sort_by || "id"]: sort_type || "desc" }
          : {}),
      },
      relations: {
        ...(slug ? { images: true } : {}),
        ...(product_variants
          ? {
              productVariants: {
                variantValues: { variant: true },
              },
            }
          : {}),
        ...(images ? { images: true } : {}),
        groupProduct: true,
      },
      where: {
        ...(name ? { name } : {}),
        ...(slug ? { slug } : {}),
        ...(group_product_slug
          ? { groupProduct: { slug: group_product_slug } }
          : {}),
        ...(min_price && !max_price
          ? { productVariants: { price: MoreThanOrEqual(+min_price) } }
          : {}),
        ...(max_price && max_price
          ? {
              productVariants: {
                price: Between(+(min_price || "0"), +(max_price || "0")),
              },
            }
          : {}),
        ...(v_ids
          ? { productVariants: { variantValues: { id: In(v_ids.split("-")) } } }
          : {}),
      },
      ...(take !== -1 ? { take } : {}),
      ...(skip !== -1 ? { skip } : {}),
    });
    if (product_variants) {
      let price = (product: Product, type: "min" | "max") =>
        product.productVariants && product.productVariants.length > 0
          ? type === "min"
            ? minPrice(product)
            : maxPrice(product)
          : product.price;
      products = products.map((product: Product) => ({
        ...product,
        minPrice: price(product, "min"),
        maxPrice: price(product, "max"),
      })) as any;
      products.sort(
        (a: any, b: any) =>
          (a.minPrice - b.minPrice) * (sort_type === "asc" ? 1 : -1)
      );
    }
    return handleItems(STATUS_OK, products, count, take);
  } catch (error) {
    return handleError(error);
  }
};

export const createFavoriteProduct = async (
  userId: number,
  productId: number
): Promise<ResponseData> => {
  try {
    return handleItem(
      201,
      await FavoriteProduct.save({
        userId,
        productId,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

export const search = async (
  query: SearchProductQueryParams
): Promise<ResponseData> => {
  const { sort_by, sort_type, q, product_variants, images } = query;
  const take: number = query.limit ? parseInt(query.limit) : -1;
  const skip: number =
    take !== -1 && query.p ? (parseInt(query.p) - 1) * take : -1;
  try {
    const where: any = {};

    let productVariants = await ProductVariant.find({
      where: q
        ? [
            { product: { name: Like(`%${q}%`) } },
            { product: { slug: Like(`%${q}%`) } },
            { product: { groupProduct: { name: Like(`%${q}%`) } } },
            { product: { groupProduct: { slug: Like(`%${q}%`) } } },
            { variantValues: { value: Like(`%${q}%`) } },
          ]
        : {},
    });
    let listId = productVariants.map((pv: ProductVariant) => pv.productId);
    let products: any = await Product.find({
      order: {
        [sort_by || "id"]: sort_type || "desc",
      },
      relations: {
        ...(product_variants
          ? {
              productVariants: {
                variantValues: { variant: true },
              },
            }
          : {}),
        ...(images ? { images: true } : {}),
        groupProduct: true,
      },
      where: {
        id: In(listId),
      },
      ...(take !== -1 ? { take } : {}),
      ...(skip !== -1 ? { skip } : {}),
    });
    products = products.map((product: Product) => ({
      ...product,
      minPrice:
        product.productVariants && product.productVariants.length > 0
          ? minPrice(product)
          : product.price,
      maxPrice:
        product.productVariants && product.productVariants.length > 0
          ? maxPrice(product)
          : product.price,
    }));
    const count = await Product.count({ where });
    return handleItems(STATUS_OK, products, count, take);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteFavoriteProduct = async (
  userId: number,
  productId: number
): Promise<ResponseData> => {
  try {
    await FavoriteProduct.delete({ userId, productId });
    return handleItem(200);
  } catch (error) {
    return handleError(error);
  }
};

export const getFavoriteProducts = async (
  userId: number,
  query: PaginationParams & RelationQueryParams
): Promise<ResponseData> => {
  try {
    const { product_variants, images } = query;
    const take: number = query.limit ? parseInt(query.limit) : -1;
    const skip: number =
      take !== -1 && query.p ? (parseInt(query.p) - 1) * take : -1;
    const [favoriteList, count] = await FavoriteProduct.findAndCount({
      where: { userId },
      relations: {
        product: {
          ...(product_variants
            ? {
                productVariants: {
                  variantValues: { variant: true },
                },
              }
            : {}),
          ...(images ? { images: true } : {}),
          groupProduct: true,
        },
      },
      ...(take !== -1 ? { take } : {}),
      ...(skip !== -1 ? { skip } : {}),
    });
    return handleItems(
      STATUS_OK,
      favoriteList.map((item: FavoriteProduct) => ({
        ...item.product,
        minPrice: minPrice(item.product),
        maxPrice:
          item.product.productVariants &&
          item.product.productVariants.length > 0
            ? maxPrice(item.product)
            : item.product.price,
      })),
      count,
      take
    );
  } catch (error) {
    return handleError(error);
  }
};

export const getProductById = async (id: number): Promise<ResponseData> => {
  try {
    const product = await Product.findOne({ where: { id } });

    return handleItem(STATUS_OK, product);
  } catch (error) {
    return handleError(error);
  }
};

export const createProduct = async (
  body: CreateProductDTO
): Promise<ResponseData> => {
  try {
    const { name } = body;
    console.log(body);
    let slug =
      body.slug ||
      slugify(name, {
        trim: true,
        locale: "vi",
        lower: true,
      });
    const product = await Product.save(
      Object.assign(new Product(), { ...body, slug })
    );
    return handleItem(STATUS_CREATED, product);
  } catch (error) {
    return handleError(error);
  }
};

export const createProducts = async (
  body: CreateProductDTO[]
): Promise<ResponseData> => {
  try {
    const product = await Product.save(
      body.map((dto) => Object.assign(new Product(), dto))
    );
    return handleItem(STATUS_CREATED, product);
  } catch (error) {
    return handleError(error);
  }
};

export const updateProductThumbnail = async (
  id: number,
  thumbnail: string
): Promise<ResponseData> => {
  try {
    let product = await Product.findOne({ where: { id } });
    if (product) {
      // const oldThumbnail = product.thumbnail;
      product = await Product.save(Object.assign(product, { thumbnail }));
      // const image = await ProductVariantImage.findOneBy({
      //   productId: product.id,
      //   path: oldThumbnail,
      // });
      // if (image) {
      //   // Delete image on cloudinary
      //   await getCloudinary().v2.uploader.destroy(
      //     "cv-app" + image.path.split("cv-app")[1].split(".")[0]
      //   );
      //   // Delete image on database
      //   await ProductVariantImage.delete({ id: image.id });
      // }
    }

    return handleItem(STATUS_OK, product);
  } catch (error) {
    return handleError(error);
  }
};
export const updateProduct = async (
  id: number,
  body: Product
): Promise<ResponseData> => {
  try {
    let product = await Product.findOne({ where: { id } });
    if (product) product = await Product.save(Object.assign(product, body));
    return handleItem(STATUS_OK, product);
  } catch (error) {
    return handleError(error);
  }
};

export const softDeleteProduct = async (id: number): Promise<ResponseData> => {
  try {
    await AppDataSource.getRepository(Product).softDelete({ id });
    return handleItem(STATUS_OK);
  } catch (error) {
    return handleError(error);
  }
};

export const restoreProduct = async (id: number): Promise<ResponseData> => {
  try {
    await AppDataSource.getRepository(Product).restore({ id });
    return handleItem(STATUS_OK);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteProduct = async (id: number): Promise<ResponseData> => {
  try {
    await Product.delete({ id });
    return handleItem(STATUS_OK);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteProducts = async (ids: number[]): Promise<ResponseData> => {
  try {
    await Product.delete(ids);
    return handleItem(STATUS_OK);
  } catch (error) {
    return handleError(error);
  }
};
