import { IsNumber, Min } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Order } from "./order.entity";
import { ProductVariant } from "./productvariant.entity";

@Entity({ name: "chitietdonhang" })
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "machitietdonhang" })
  id: number;

  @Column({ nullable: false, name: "madonhang" })
  @IsNumber()
  orderId: number;

  @Column({ nullable: false, name: "mahangbienthe" })
  @IsNumber()
  productVariantId: number;

  @Column({ nullable: false, name: "soluong" })
  @IsNumber()
  @Min(1)
  quantity: number;

  @Column({ nullable: false, name: "giaban" })
  @IsNumber()
  price: number;

  @CreateDateColumn({ name: "ngaytao" })
  createdAt: Date;

  @UpdateDateColumn({ name: "ngaycapnhat" })
  updatedAt: Date;

  @ManyToOne(() => ProductVariant, (e) => e.items)
  @JoinColumn({ name: "mahangbienthe", referencedColumnName: "id" })
  productVariant: ProductVariant;

  @ManyToOne(() => Order, (e) => e.items)
  @JoinColumn({ name: "madonhang", referencedColumnName: "id" })
  order: Order;
}

@EventSubscriber()
export class OrderItemSubscriber
  implements EntitySubscriberInterface<OrderItem>
{
  listenTo() {
    return OrderItem;
  }

  async beforeInsert(event: InsertEvent<OrderItem>): Promise<any> {
    try {
      // if(!event.entity.orderId) {
      //   event.entity.orderId = await Order.create().id
      // }
      const existingOrderItem = await OrderItem.findOne({
        where: {
          productVariantId: event.entity.productVariantId,
          orderId: event.entity.orderId,
        },
        relations: { productVariant: true },
      });
      if (existingOrderItem) {
        event.entity.id = existingOrderItem.id;
        event.entity.createdAt = existingOrderItem.createdAt;
        event.entity.updatedAt = existingOrderItem.updatedAt;
        event.entity.quantity += existingOrderItem.quantity;
        event.entity.price = existingOrderItem.productVariant.price;
        event.entity.updatedAt = new Date();
        await OrderItem.delete({
          id: existingOrderItem.id,
        });
      } else {
        const productVariant = await ProductVariant.findOneBy({
          id: event.entity.productVariantId,
        });
        if (productVariant) event.entity.price = productVariant.price;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
