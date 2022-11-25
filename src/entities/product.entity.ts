import { IsString } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { FavoriteProduct } from "./favoriteproduct.entity";
import { GroupProduct } from "./groupproduct.entity";
import { ProductVariant } from "./productvariant.entity";
import { ProductVariantImage } from "./productvariantimage.entity";

@Entity({ name: "mathang" })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "mahang" })
  id: number;

  @Column({ nullable: false, name: "tenhang" })
  @IsString()
  name: string;

  @Column({ nullable: false, unique: true, name: "duongdan" })
  @IsString()
  slug: string;

  @Column({ nullable: true, name: "hinhanh" })
  @IsString()
  thumbnail: string;

  @Column({ nullable: true, name: "mota" })
  @IsString()
  description: string;

  @Column({ default: 1, name: "manhomsanpham" })
  @IsString()
  groupProductId: number;

  @OneToMany(() => ProductVariant, (e) => e.product)
  productVariants: ProductVariant[];

  @CreateDateColumn({ name: "ngaytao" })
  createdAt: Date;

  @UpdateDateColumn({ name: "ngaycapnhat" })
  updatedAt: Date;

  @OneToMany(() => ProductVariantImage, (e) => e.product)
  images: ProductVariantImage[];

  @ManyToOne(() => GroupProduct, (e) => e.products)
  @JoinColumn({ name: "manhomsanpham", referencedColumnName: "id" })
  groupProduct: GroupProduct;

  @OneToMany(() => FavoriteProduct, (e) => e.product)
  favorites: FavoriteProduct[];
}
