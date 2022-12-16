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
import { ProductVariant } from "./productvariant.entity";
import { ProductVariantImage } from "./productvariantimage.entity";
import { Variant } from "./variant.entity";

@Entity({ name: "giatribienthe" })
export class VariantValue extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "magiatribienthe" })
  id: number;

  @Column({ nullable: false, unique: true, name: "giatri" })
  @IsString()
  value: string;

  @Column({ name: "mabt", default: 1 })
  @IsNumber()
  variantId: number;

  @CreateDateColumn({ name: "ngaytao" })
  createdAt: Date;

  @UpdateDateColumn({ name: "ngaycapnhat" })
  updatedAt: Date;

  @ManyToMany(() => ProductVariant, (e) => e.variantValues)
  @JoinTable({ name: "mathangbienthe_giatribienthe" })
  productVariants: ProductVariant[];

  @ManyToOne(() => Variant, (e) => e.variantValues)
  @JoinColumn({ name: "mabt", referencedColumnName: "id" })
  variant: Variant;

  // @OneToMany(() => ProductVariantImage, (e) => e.variant)
  // images: ProductVariantImage[];
}
