import { Order } from "../entities/order.entity";
import { CreateCartItemDTO } from "../dtos/createcartitem.dto";
import { IsNull } from "typeorm";
import { OrderItem } from "../entities/orderitem.entity";
import { handleError, handleItem, handleItems } from "../utils";
import { User } from "../entities/user.entity";
import { QueryParams, ResponseData } from "../utils/types";
import { CheckoutDTO } from "../dtos/checkout.dto";
import { ProductVariant } from "../entities/productvariant.entity";
type OrderQueryParams = {
  start?: string;
  end?: string;
} & QueryParams;
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

export const userOrders = async (
  userId: number,
  query: OrderQueryParams
): Promise<ResponseData> => {
  try {
    const take: number = query.limit ? parseInt(query.limit) : -1;
    const skip: number =
      take !== -1 && query.p ? (parseInt(query.p) - 1) * take : -1;
    const orders = await Order.find({
      where: { userId },
      relations: {
        items: {
          productVariant: {
            product: true,
            variants: true,
          },
        },
      },
      ...(take !== -1 ? { take } : {}),
      ...(skip !== -1 ? { skip } : {}),
    });
    const count = await Order.count({ where: { userId } });
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
          productVariant: {
            product: true,
            variants: true,
          },
        },
      },
    });
    return handleItem(200, existingCart);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteCartItem = async (
  userId: number,
  productVariantId: number
): Promise<ResponseData> => {
  try {
    const orderItem = await OrderItem.findOne({
      where: { order: { userId }, productVariantId },
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
  userId: number,
  productVariantId: number,
  newQuantity: number
): Promise<ResponseData> => {
  try {
    const orderItem = await OrderItem.findOne({
      where: { order: { userId }, productVariantId },
    });
    if (orderItem) {
      await OrderItem.update(
        { id: orderItem.id },
        {
          quantity: newQuantity,
        }
      );
      return handleItem(200);
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
      return handleItem(
        201,
        await OrderItem.save({
          productVariantId: body.productVariantId,
          quantity: body.quantity,
          orderId: existingCart.id,
        })
      );
    }
    return handleItem(404);
  } catch (error) {
    return handleError(error);
  }
};
