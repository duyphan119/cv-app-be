import { Order } from "../entities/order.entity";
import { CreateCartItemDTO } from "../dtos/createcartitem.dto";
import { IsNull, Not } from "typeorm";
import { OrderItem } from "../entities/orderitem.entity";
import { handleError, handleItem, handleItems } from "../utils";
import { User } from "../entities/user.entity";
import { QueryParams, ResponseData } from "../utils/types";
import { CheckoutDTO } from "../dtos/checkout.dto";
import { STATUS_INTERVAL_ERROR, STATUS_OK } from "../constants";
import { ProductVariant } from "../entities/productvariant.entity";
import { Product } from "../entities/product.entity";
type OrderQueryParams = QueryParams &
  Partial<{
    start: string;
    end: string;
    address: string;
    fullName: string;
    items: string;
  }>;

export const getAllOrders = async (
  query: OrderQueryParams
): Promise<ResponseData> => {
  try {
    const { sortBy, sortType, items } = query;
    let take: number = query.limit ? +query.limit : -1;
    let skip: number = take !== -1 && query.p ? (+query.p - 1) * take : -1;

    let [orders, count] = await Order.findAndCount({
      order: {
        [sortBy || "id"]: sortType || "desc",
      },
      relations: {
        ...(items
          ? {
              items: {
                product: { images: true },
                productVariant: { variantValues: true },
              },
            }
          : {}),
      },
      where: {
        status: Not(IsNull()),
      },
      ...(take !== -1 ? { take } : {}),
      ...(skip !== -1 ? { skip } : {}),
    });

    return handleItems(STATUS_OK, orders, count, take);
  } catch (error) {
    return handleError(error);
  }
};

export const getOrderById = async (id: number): Promise<ResponseData> => {
  try {
    const order = await Order.findOne({
      where: { id },
      relations: {
        items: {
          product: { images: true },
          productVariant: { variantValues: true },
        },
        discount: true,
      },
    });
    if (order) return handleItem(STATUS_OK, order);
    return handleItem(STATUS_INTERVAL_ERROR);
  } catch (error) {
    return handleError(error);
  }
};

export const checkout = async (
  userId: number,
  body: CheckoutDTO
): Promise<ResponseData> => {
  try {
    let existingCart = await Order.findOne({
      where: {
        userId,
        status: IsNull(),
      },
      relations: {
        items: {
          productVariant: true,
        },
      },
    });
    if (existingCart) {
      await Order.update(
        {
          id: existingCart.id,
        },
        { ...body, status: "Đang xử lý" }
      );
      return handleItem(200);
    }
    return handleItem(401);
  } catch (error) {
    return handleError(error);
  }
};

export const getOrdersByUserId = async (
  userId: number,
  query: OrderQueryParams
): Promise<ResponseData> => {
  try {
    const take: number = query.limit ? +query.limit : -1;
    const skip: number = take !== -1 && query.p ? (+query.p - 1) * take : -1;
    const [orders, count] = await Order.findAndCount({
      where: { userId, status: Not(IsNull()) },
      relations: {
        items: {
          product: true,
          productVariant: {
            variantValues: {
              variant: true,
            },
          },
        },
      },
      ...(take !== -1 ? { take } : {}),
      ...(skip !== -1 ? { skip } : {}),
    });
    return handleItems(200, orders, count, take);
  } catch (error) {
    return handleError(error);
  }
};

export const getCart = async (userId: number): Promise<ResponseData> => {
  try {
    let existingCart = await Order.findOne({
      where: {
        userId,
        status: IsNull(),
      },
      relations: {
        items: {
          product: {
            images: true,
          },
          productVariant: {
            variantValues: {
              variant: true,
            },
          },
        },
      },
    });
    return handleItem(200, existingCart);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteCartItem = async (id: number): Promise<ResponseData> => {
  try {
    const orderItem = await OrderItem.findOne({
      where: { id },
    });
    if (orderItem) {
      await OrderItem.delete({
        id: orderItem.id,
      });
      return handleItem(200);
    }
    return handleItem(401);
  } catch (error) {
    return handleError(error);
  }
};

export const updateCartItem = async (
  id: number,
  newQuantity: number
): Promise<ResponseData> => {
  try {
    const orderItem = await OrderItem.findOne({
      where: { id },
    });
    if (orderItem) {
      orderItem.quantity = newQuantity;
      await OrderItem.save(orderItem);
      return handleItem(200, await OrderItem.save(orderItem));
    }
    return handleItem(401);
  } catch (error) {
    return handleError(error);
  }
};

export const createCartItem = async (
  userId: number,
  body: CreateCartItemDTO
): Promise<ResponseData> => {
  try {
    const user = await User.findOneBy({ id: userId });
    if (user) {
      let existingCart = await Order.findOne({
        where: {
          userId,
          status: IsNull(),
        },
      });

      if (!existingCart) {
        existingCart = await Order.save({
          userId,
          phone: user.phone,
          fullName: user.fullName,
        });
      }
      const savedCartItem = await OrderItem.save({
        ...(body.productVariantId
          ? { productVariantId: body.productVariantId }
          : {}),
        productId: body.productId,
        orderId: existingCart.id,
        quantity: body.quantity,
      });
      return handleItem(
        201,
        await OrderItem.findOne({
          where: { id: savedCartItem.id },
          relations: {
            product: {
              images: true,
            },
            productVariant: {
              variantValues: {
                variant: true,
              },
            },
          },
        })
      );
    }
    return handleItem(404);
  } catch (error) {
    return handleError(error);
  }
};
export const updateStatus = async (
  id: number,
  newStatus: string
): Promise<ResponseData> => {
  try {
    const order = await Order.findOneBy({ id });
    if (order) {
      const oldStatus = order.status;

      if (oldStatus === "Đang xử lý" && newStatus === "Đang giao hàng") {
        const orderItems = await OrderItem.find({
          where: { orderId: order.id },
          relations: { productVariant: true },
        });
        const promises: Promise<any>[] = [];
        orderItems.forEach((orderItem) => {
          if (orderItem.productVariant) {
            promises.push(
              ProductVariant.update(
                {
                  inventory:
                    orderItem.productVariant.inventory - orderItem.quantity,
                },
                { id: orderItem.productVariant.id }
              )
            );
          } else {
            promises.push(
              Product.update(
                { inventory: orderItem.product.inventory - orderItem.quantity },
                { id: orderItem.product.id }
              )
            );
          }
        });
        await Promise.all(promises);
      }
      return handleItem(
        STATUS_OK,
        await Order.save({ ...order, status: newStatus })
      );
    }
    return handleItem(STATUS_INTERVAL_ERROR);
  } catch (error) {
    return handleError(error);
  }
};
export const getShippingPrice = () => {
  try {
  } catch (error) {
    return handleError(error);
  }
};
