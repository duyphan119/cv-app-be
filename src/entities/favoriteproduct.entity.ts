import { IsNumber } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.entity";

@Entity({ name: "taikhoan_mathang" })
export class FavoriteProduct extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "mataikhoan_mathang" })
  id: number;

  @Column({ nullable: false, name: "matk" })
  @IsNumber()
  userId: number;

  @Column({ nullable: false, name: "mahang" })
  @IsNumber()
  productId: number;

  @ManyToOne(() => Product, (e) => e.favorites)
  @JoinColumn({ name: "mahang", referencedColumnName: "id" })
  product: Product;

  @CreateDateColumn({ name: "ngaytao" })
  createdAt: Date;
}
