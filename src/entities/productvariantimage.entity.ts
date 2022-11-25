import { IsNumber, IsString } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./product.entity";
import { ProductVariant } from "./productvariant.entity";
import { Variant } from "./variant.entity";

@Entity({ name: "hinhanhmathangbienthe" })
export class ProductVariantImage extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "mahinhanhmathangbienthe" })
  id: number;

  @Column({ nullable: true, name: "duongdan" })
  @IsString()
  path: string;

  @Column({ name: "mahang" })
  @IsNumber()
  productId: number;

  @Column({ name: "mabienthe" })
  @IsNumber()
  variantId: number;

  @ManyToOne(() => Product, (e) => e.images)
  @JoinColumn({ name: "mahang", referencedColumnName: "id" })
  product: Product;

  @ManyToOne(() => Variant, (e) => e.images)
  @JoinColumn({ name: "mabienthe", referencedColumnName: "id" })
  variant: Variant;

  @CreateDateColumn({ name: "ngaytao" })
  createdAt: Date;

  @UpdateDateColumn({ name: "ngaycapnhat" })
  updatedAt: Date;
}
