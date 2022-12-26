import { Blog } from "../entities/blog.entity";
import { STATUS_CREATED, STATUS_OK, STATUS_UNAUTH } from "../constants";
import { Product } from "../entities/product.entity";
import { handleError, handleItem, handleItems } from "../utils";
import { QueryParams, ResponseData } from "../utils/types";
import slugify from "slugify";
import { ILike } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

type BlogQueryParams = QueryParams &
  Partial<{
    title: string;
    slug: string;
    content: string;
    q: string;
  }>;

type CreateBlogDTO = {
  title: string;
  content: string;
} & Partial<{ thumbnail: string }>;

export const getAllBlogs = async (
  isAdmin: boolean,
  query: BlogQueryParams
): Promise<ResponseData> => {
  try {
    const { sortBy, sortType, withDeleted, title, slug, content, q } = query;
    const take: number = query.limit ? +query.limit : -1;
    const skip: number = take !== -1 && query.p ? (+query.p - 1) * take : -1;

    const [blogs, count] = await Blog.findAndCount({
      order: {
        [sortBy || "id"]: sortType || "desc",
      },
      where: {
        ...(title ? { title: ILike(`%${title}%`) } : {}),
        ...(slug ? { slug: ILike(`%${slug}%`) } : {}),
        ...(content ? { content: ILike(`%${content}%`) } : {}),
        ...(q
          ? {
              title: ILike(`%${q}%`),
              slug: ILike(`%${q}%`),
              content: ILike(`%${q}%`),
            }
          : {}),
      },
      withDeleted: isAdmin && withDeleted ? true : false,
      ...(take !== -1 ? { take } : {}),
      ...(skip !== -1 ? { skip } : {}),
    });

    return handleItems(STATUS_OK, blogs, count, take);
  } catch (error) {
    return handleError(error);
  }
};

export const getBlogById = async (id: number) => {
  try {
    const blog = await Blog.findOne({ where: { id } });
    return handleItem(STATUS_OK, blog);
  } catch (error) {
    return handleError(error);
  }
};

export const createBlog = async (
  userId: number,
  body: CreateBlogDTO
): Promise<ResponseData> => {
  try {
    const blog = await Blog.save({
      ...body,
      userId,
      slug: slugify(body.title, { lower: true }),
    });
    return handleItem(STATUS_CREATED, blog);
  } catch (error) {
    return handleError(error);
  }
};

export const updateBlog = async (
  id: number,
  userId: number,
  body: Partial<Blog>
): Promise<ResponseData> => {
  try {
    const blog = await Blog.findOneBy({ id, userId });
    if (blog) {
      return handleItem(
        STATUS_OK,
        await Blog.save({
          ...blog,
          ...body,
          ...(body.title ? { slug: slugify(body.title, { lower: true }) } : {}),
        })
      );
    }
    return handleItem(STATUS_UNAUTH);
  } catch (error) {
    return handleError(error);
  }
};

export const softDeleteBlog = async (id: number): Promise<ResponseData> => {
  try {
    await AppDataSource.getRepository(Blog).softDelete({ id });
    return handleItem(STATUS_OK);
  } catch (error) {
    return handleError(error);
  }
};

export const restoreBlog = async (id: number): Promise<ResponseData> => {
  try {
    await AppDataSource.getRepository(Blog).restore({ id });
    return handleItem(STATUS_OK);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteBlog = async (id: number): Promise<ResponseData> => {
  try {
    await Product.delete({ id });
    return handleItem(STATUS_OK);
  } catch (error) {
    return handleError(error);
  }
};
