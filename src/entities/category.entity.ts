import { IsNumber, IsString, Length } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "danhmuc" })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "madanhmuc" })
  id: number;

  @Column({ nullable: false, name: "tendanhmuc" })
  @IsString()
  name: string;

  @Column({ nullable: false, name: "duongdan" })
  @IsString()
  slug: string;

  @Column({ nullable: false, name: "hinhanh" })
  @IsString()
  thumbnail: string;

  @Column({ nullable: false, name: "mota" })
  @IsString()
  description: string;

  @Column({ name: "danhmuccha" })
  @IsNumber()
  parentId: number;

  @CreateDateColumn({ name: "ngaytao" })
  createdAt: Date;

  @UpdateDateColumn({ name: "ngaycapnhat" })
  updatedAt: Date;
}
