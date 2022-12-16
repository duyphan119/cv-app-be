import { Category } from "./category.entity";
import { FavoriteProduct } from "./favoriteproduct.entity";
import { GroupProduct } from "./groupproduct.entity";
import { Order, OrderSubscriber } from "./order.entity";
import { OrderItem, OrderItemSubscriber } from "./orderitem.entity";
import { Product } from "./product.entity";
import { ProductVariant } from "./productvariant.entity";
import { ProductVariantImage } from "./productvariantimage.entity";
import { User } from "./user.entity";
import { Variant } from "./variant.entity";
import { VariantValue } from "./variantvalue.entity";

const entities = [
  User,
  Product,
  Variant,
  ProductVariant,
  Order,
  ProductVariantImage,
  Category,
  GroupProduct,
  FavoriteProduct,
  OrderItem,
  VariantValue,
];

export const subscribers = [OrderItemSubscriber, OrderSubscriber];
export default entities;
