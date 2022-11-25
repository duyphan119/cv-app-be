import { IsNumber, IsString } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrderItem } from "./orderitem.entity";
import { Product } from "./product.entity";
import { ProductVariantImage } from "./productvariantimage.entity";
import { Variant } from "./variant.entity";

@Entity({ name: "mathangbienthe" })
export class ProductVariant extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "mahangbienthe" })
  id: number;

  @Column({ nullable: true, name: "tenhangbienthe" })
  @IsString()
  name: string;

  @Column({ default: 0, name: "solongton" })
  @IsNumber()
  inventory: number;

  @Column({ nullable: false, name: "giaban" })
  @IsNumber()
  price: number;

  @Column({ nullable: false, name: "mahang" })
  @IsNumber()
  productId: number;

  @CreateDateColumn({ name: "ngaytao" })
  createdAt: Date;

  @UpdateDateColumn({ name: "ngaycapnhat" })
  updatedAt: Date;

  @ManyToMany(() => Variant, (e) => e.productVariants)
  @JoinTable({ name: "mathangbienthe_bienthe" })
  variants: Variant[];

  @ManyToOne(() => Product, (e) => e.productVariants)
  @JoinColumn({ name: "mahang", referencedColumnName: "id" })
  product: Product;

  @OneToMany(() => OrderItem, (e) => e.order)
  items: OrderItem[];
}
