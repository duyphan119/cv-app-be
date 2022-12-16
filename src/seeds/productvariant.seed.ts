import { VariantValue } from "../entities/variantvalue.entity";
import { AppDataSource } from "../data-source";
import { ProductVariant } from "../entities/productvariant.entity";
import { Variant } from "../entities/variant.entity";

export const productVariantSeed = async () => {
  const repository = AppDataSource.getRepository(ProductVariant);
  const varaintRepository = AppDataSource.getRepository(Variant);

  const list = await repository.find();
  // await AppDataSource.createQueryBuilder()
  //   .update(Product)
  //   .set({
  //     thumbnail:
  //       "https://scontent.fsgn8-2.fna.fbcdn.net/v/t39.30808-6/308161063_394177769577123_3560558019291503964_n.jpg?stp=cp6_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=Jg23nplMT6UAX_FtUsO&_nc_ht=scontent.fsgn8-2.fna&oh=00_AfCO_p3J98bV4ed3z2-B7GSWNAL-ECERQXTQt2d8v8exLQ&oe=637F26D5",
  //   })
  //   .execute();
  // AppDataSource.createQueryBuilder()
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
  if (list.length === 0) {
    // repository.save({

    // })
    const s = await VariantValue.findOne({ where: { value: "S" } });
    const m = await VariantValue.findOne({ where: { value: "M" } });
    const l = await VariantValue.findOne({ where: { value: "L" } });
    const xl = await VariantValue.findOne({ where: { value: "XL" } });
    const xxx: any = [
      [trang, s],
      [trang, m],
      [trang, l],
      [trang, xl],
      [den, s],
      [den, m],
      [den, l],
      [den, xl],
    ];
    const xxx2: any = [
      [xanhduong, s],
      [xanhduong, m],
      [xanhduong, l],
      [xanhduong, xl],
      [dor, s],
      [dor, m],
      [dor, l],
      [dor, xl],
    ];
    const xxx3: any = [
      [tim, s],
      [tim, m],
      [tim, l],
      [tim, xl],
      [nau, s],
      [nau, m],
      [nau, l],
      [nau, xl],
    ];
    console.log(
      xxx2[0].map((_: VariantValue, i: number) => (_ ? _.value : ""))
    );
    await repository.save(
      new Array(32 * 8).fill("").map((_: string, index: number) => ({
        productId: Math.floor(index / 8) + 1,
        inventory: 100,
        price: 120000 + (Math.floor(index / 8) + 1) * 3000,

        variants: xxx[index % 8],
        name: xxx[index % 8]
          .map((_: VariantValue, i: number) => (_ ? _.value : ""))
          .join(" / "),
      }))
    );
    await repository.save(
      new Array(32 * 8).fill("").map((_: string, index: number) => ({
        productId: 32 + Math.floor(index / 8) + 1,
        inventory: 100,
        price: 120000 + (Math.floor(index / 8) + 1) * 3000,

        variantValues: xxx2[index % 8],
        name: xxx2[index % 8]
          .map((_: VariantValue, i: number) => (_ ? _.value : ""))
          .join(" / "),
      }))
    );
    await repository.save(
      new Array(32 * 8).fill("").map((_: string, index: number) => ({
        productId: 64 + Math.floor(index / 8) + 1,
        inventory: 100,
        price: 120000 + (Math.floor(index / 8) + 1) * 3000,

        variantValues: xxx3[index % 8],
        name: xxx3[index % 8]
          .map((_: VariantValue, i: number) => (_ ? _.value : ""))
          .join(" / "),
      }))
    );
  }
};
