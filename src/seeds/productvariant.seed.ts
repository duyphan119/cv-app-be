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
  console.log(list[0]);
  if (list.length === 0) {
    // repository.save({

    // })
    const trang = await varaintRepository.findOne({ where: { name: "Đỏ" } });
    const den = await varaintRepository.findOne({
      where: { name: "Xanh dương" },
    });
    const s = await varaintRepository.findOne({ where: { name: "S" } });
    const m = await varaintRepository.findOne({ where: { name: "M" } });
    const l = await varaintRepository.findOne({ where: { name: "L" } });
    const xl = await varaintRepository.findOne({ where: { name: "XL" } });
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
    repository.save(
      new Array(72 * 8).fill("").map((_: string, index: number) => ({
        productId: 24 + Math.floor(index / 8) + 1,
        inventory: 100,
        price: 120000 + (Math.floor(index / 8) + 1) * 3000,
        thumbnail:
          "https://i.pinimg.com/564x/25/7a/3d/257a3d05d1024553a75ec27802a3780d.jpg",
        variants: xxx[index % 8],
        name: xxx[index % 8]
          .map((_: Variant, i: number) => (_ ? _.name : ""))
          .join(" / "),
      }))
    );
    // repository.save(
    //   new Array(24).fill("").map((_: string, index: number) => ({
    //     name: `Mặt hàng ${index + 1}`,
    //     slug: slugify(`Mặt hàng ${index + 1}`),
    //     thumbnail:
    //       "https://scontent.fsgn8-2.fna.fbcdn.net/v/t39.30808-6/308161063_394177769577123_3560558019291503964_n.jpg?stp=cp6_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=Jg23nplMT6UAX_FtUsO&_nc_ht=scontent.fsgn8-2.fna&oh=00_AfCO_p3J98bV4ed3z2-B7GSWNAL-ECERQXTQt2d8v8exLQ&oe=637F26D5",
    //     price: 120000 + index * 10000,
    //   }))
    // );
  }
};
