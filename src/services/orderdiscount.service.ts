import { QueryParams, ResponseData } from "../utils/types";
import { OrderDiscount } from "../entities/orderdiscount.entity";
import { handleError, handleItem, handleItems } from "../utils";
import { STATUS_CREATED, STATUS_INTERVAL_ERROR, STATUS_OK } from "../constants";
import { Order } from "../entities/order.entity";
import { LessThan, LessThanOrEqual, MoreThan } from "typeorm";
import { OrderItem } from "../entities/orderitem.entity";

type OrderDiscountQueryParams = QueryParams & Partial<{}>;

type CreateOrderDiscountDTO = {
  code: string;
  end: Date;
  value: number;
} & Partial<{
  start: Date;
  minPrice: number;
}>;
export const getAllOrderDiscounts = async (
  query: OrderDiscountQueryParams
): Promise<ResponseData> => {
  try {
    const { sortBy, sortType } = query;
    const take: number = query.limit ? +query.limit : -1;
    const skip: number = take !== -1 && query.p ? (+query.p - 1) * take : -1;

    const [orderDiscounts, count] = await OrderDiscount.findAndCount({
      order: {
        [sortBy || "id"]: sortType || "desc",
      },
      ...(take !== -1 ? { take } : {}),
      ...(skip !== -1 ? { skip } : {}),
    });
    return handleItems(STATUS_OK, orderDiscounts, count, take);
  } catch (error) {
    return handleError(error);
  }
};

export const check = async (userId: number, code: string, total: number) => {
  try {
    const order = await Order.findOneBy({ userId, discount: { code } });

    if (!order) {
      const now = new Date();
      const orderDiscount = await OrderDiscount.findOneBy({
        code,
        end: MoreThan(now),
        start: LessThan(now),
        minPrice: LessThanOrEqual(+total),
      });
      if (orderDiscount) return handleItem(STATUS_OK, orderDiscount);
    }
    return handleItem(STATUS_INTERVAL_ERROR);
  } catch (error) {
    return handleError(error);
  }
};

export const createOrderDiscount = async (
  body: CreateOrderDiscountDTO
): Promise<ResponseData> => {
  try {
    return handleItem(
      STATUS_CREATED,
      await OrderDiscount.save(Object.assign(new OrderDiscount(), body))
    );
  } catch (error) {
    return handleError(error);
  }
};
