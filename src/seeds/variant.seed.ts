import { AppDataSource } from "../data-source";
import { Variant } from "../entities/variant.entity";

export const variantSeed = async () => {
  const repository = AppDataSource.getRepository(Variant);

  const list = await repository.find();
  if (list.length === 0) {
    const listColor: string[] = [
      "Đen",
      "Trắng",
      "Xanh lá",
      "Xanh dương",
      "Đỏ",
      "Vàng",
      "Tím",
      "Cam",
      "Hồng",
      "Xám",
      "Nâu",
    ];
    const listSizeString: string[] = [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL",
      "4XL",
    ];
    const listSizeNumber: number[] = new Array(30)
      .fill(0)
      .map((_, index) => index + 12);

    listColor.sort((a, b) => a.localeCompare(b));
    repository.save([
      ...listColor.map((color: string) => ({ name: color, type: "Màu sắc" })),
      ...listSizeString.map((sizeString: string) => ({
        name: sizeString,
        type: "Kích cỡ",
      })),
      ...listSizeNumber.map((sizeNumber: number) => ({
        name: "" + sizeNumber,
        type: "Kích cỡ",
      })),
    ]);
  }
};
