import { IsBoolean, IsEmail, IsNumber, IsString, Min } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Order } from "./order.entity";

@Entity({ name: "sodiachi" })
export class UserAddress extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "masodiachi" })
  id: number;

  @Column({ nullable: false, name: "matk" })
  @IsNumber()
  userId: number;

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

  @CreateDateColumn({ name: "ngaytao" })
  createdAt: Date;

  @UpdateDateColumn({ name: "ngaycapnhat" })
  updatedAt: Date;
}
