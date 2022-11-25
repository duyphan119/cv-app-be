import { IsNumber, IsString, Length } from "class-validator";
import {
  AfterUpdate,
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  EntitySubscriberInterface,
  EventSubscriber,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  UpdateEvent,
} from "typeorm";
import { OrderItem } from "./orderitem.entity";
import { ProductVariant } from "./productvariant.entity";
import { User } from "./user.entity";

@Entity({ name: "donhang" })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "madonhang" })
  id: number;

  @Column({ nullable: true, name: "hoten" })
  @IsString()
  fullName: string;

  @Column({ nullable: true, length: 10, name: "sodienthoai" })
  @IsString()
  @Length(10)
  phone: string;

  @Column({ nullable: true, name: "tinh" })
  @IsString()
  province: string;

  @Column({ nullable: true, name: "quan" })
  @IsString()
  district: string;

  @Column({ nullable: true, name: "phuong" })
  @IsString()
  ward: string;

  @Column({ nullable: true, name: "diachi" })
  @IsString()
  address: string;

  @Column({ nullable: true, name: "trangthaidonhang" })
  @IsString()
  status: string;

  @Column({ default: 0, name: "tienvanchuyen" })
  @IsNumber()
  shippingPrice: number;

  @Column({
    default: "Thanh toán khi nhận hàng (COD)",
    name: "phuongthucthanhtoan",
  })
  @IsString()
  paymentMethod: string;

  @Column({ nullable: true, name: "ghichu" })
  @IsString()
  note: string;

  @Column({ nullable: false, name: "matk" })
  @IsNumber()
  userId: number;

  @CreateDateColumn({ name: "ngaytao" })
  createdAt: Date;

  @UpdateDateColumn({ name: "ngaycapnhat" })
  updatedAt: Date;

  @ManyToOne(() => User, (e) => e.orders)
  @JoinColumn({ name: "matk", referencedColumnName: "id" })
  user: User;

  @OneToMany(() => OrderItem, (e) => e.order)
  items: OrderItem[];
}

@EventSubscriber()
export class OrderSubscriber implements EntitySubscriberInterface<Order> {
  listenTo() {
    return Order;
  }

  async afterUpdate(event: UpdateEvent<Order>): Promise<any> {
    try {
      if (event.entity) {
        let existingCart = await Order.findOne({
          where: {
            id: event.entity.id,
          },
          relations: {
            items: {
              productVariant: true,
            },
          },
        });
        if (existingCart) {
          await Promise.allSettled(
            existingCart.items.map((item: OrderItem) => {
              let inventory = item.productVariant.inventory;
              if (
                (!event.databaseEntity.status ||
                  event.databaseEntity.status === "Đang xử lý") &&
                event.entity &&
                event.entity.status &&
                event.entity.status !== "Đang xử lý"
              ) {
                inventory -= item.quantity;
              } else if (
                event.databaseEntity.status &&
                event.databaseEntity.status !== "Đang xử lý" &&
                event.entity &&
                (event.entity.status || event.entity.status === "Đang xử lý")
              ) {
                inventory += item.quantity;
              }
              return ProductVariant.update(
                {
                  id: item.productVariantId,
                },
                {
                  inventory: inventory,
                }
              );
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
