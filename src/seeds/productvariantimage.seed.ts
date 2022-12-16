import { ProductVariant } from "../entities/productvariant.entity";
import { AppDataSource } from "../data-source";
import { ProductVariantImage } from "../entities/productvariantimage.entity";
import { Variant } from "../entities/variant.entity";
import { VariantValue } from "../entities/variantvalue.entity";

const images: string[] = [
  "https://i.pinimg.com/564x/5f/7c/81/5f7c81b5d2af2ce20b46d3c271a160b9.jpg",
  "https://i.pinimg.com/564x/19/5d/ea/195dead43bc12c67aa2bd09336eab6a1.jpg",
  "https://i.pinimg.com/564x/f5/17/c3/f517c3c86b39df8b97d805c1b97145be.jpg",
  "https://i.pinimg.com/564x/b7/02/b9/b702b9d588ca507392ead19ca96c18f7.jpg",
  "https://i.pinimg.com/564x/0c/73/3f/0c733f9a38e188ca0e9a610142229bd9.jpg",
];
export const productVariantImageSeed = async () => {
  try {
    const repository1 = AppDataSource.getRepository(ProductVariantImage);

    const arr: any[] = [];
    if ((await repository1.find()).length === 0) {
      const trang = await VariantValue.findOne({ where: { value: "Trắng" } });
      const den = await VariantValue.findOne({
        where: { value: "Đen" },
      });
      const tim = await VariantValue.findOne({ where: { value: "Tím" } });
      const nau = await VariantValue.findOne({
        where: { value: "Nâu" },
      });
      const xanhduong = await VariantValue.findOne({
        where: { value: "Xanh dương" },
      });
      const dor = await VariantValue.findOne({
        where: { value: "Đỏ" },
      });
      if (trang && den && xanhduong && dor && tim && nau) {
        new Array(32).fill("").forEach((_: string, index: number) => {
          images.forEach((image: string) => {
            arr.push({
              path: image,
              productId: index + 1,
              variantValueId: trang.id,
            });
          });
          images.forEach((image: string, idx: number) => {
            arr.push({
              path: images[images.length - idx - 1],
              productId: index + 1,
              variantValueId: den.id,
            });
          });
        });
        new Array(32).fill("").forEach((_: string, index: number) => {
          images.forEach((image: string) => {
            arr.push({
              path: image,
              productId: 32 + index + 1,
              variantValueId: xanhduong.id,
            });
          });
          images.forEach((image: string, idx: number) => {
            arr.push({
              path: images[images.length - idx - 1],
              productId: 32 + index + 1,
              variantValueId: dor.id,
            });
          });
        });
        new Array(32).fill("").forEach((_: string, index: number) => {
          images.forEach((image: string) => {
            arr.push({
              path: image,
              productId: 64 + index + 1,
              variantValueId: tim.id,
            });
          });
          images.forEach((image: string, idx: number) => {
            arr.push({
              path: images[images.length - idx - 1],
              productId: 64 + index + 1,
              variantValueId: nau.id,
            });
          });
        });
        repository1.save(arr);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
