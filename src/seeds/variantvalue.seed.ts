import { VariantValue } from "../entities/variantvalue.entity";
import { AppDataSource } from "../data-source";
import { Variant } from "../entities/variant.entity";

export const variantValueSeed = async () => {
  const list = await VariantValue.find();
  if (list.length === 0) {
    const vColor = await Variant.findOneBy({ name: "Màu sắc" });
    const vSize = await Variant.findOneBy({ name: "Kích cỡ" });
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
    if (vColor && vSize)
      VariantValue.save([
        ...(listColor.map((color: string) => ({
          value: color,
          variantId: vColor.id,
        })) as any),
        ...listSizeString.map((sizeString: string) => ({
          value: sizeString,
          variantId: vSize.id,
        })),
        ...listSizeNumber.map((sizeNumber: number) => ({
          value: "" + sizeNumber,
          variantId: vSize.id,
        })),
      ]);
  }
};
