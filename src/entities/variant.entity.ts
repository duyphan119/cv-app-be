import { IsString } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProductVariant } from "./productvariant.entity";
import { ProductVariantImage } from "./productvariantimage.entity";
import { VariantValue } from "./variantvalue.entity";

@Entity({ name: "bienthe" })
export class Variant extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "mabt" })
  id: number;

  @Column({ nullable: false, unique: true, name: "tenbt" })
  @IsString()
  name: string;

  @CreateDateColumn({ name: "ngaytao" })
  createdAt: Date;

  @UpdateDateColumn({ name: "ngaycapnhat" })
  updatedAt: Date;

  @OneToMany(() => VariantValue, (e) => e.variant)
  variantValues: VariantValue[];

  // @OneToMany(() => ProductVariantImage, (e) => e.variant)
  // images: ProductVariantImage[];
}
