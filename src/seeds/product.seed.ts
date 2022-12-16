import { Product } from "../entities/product.entity";
import { AppDataSource } from "../data-source";
import slugify from "slugify";

export const productSeed = async () => {
  const repository = AppDataSource.getRepository(Product);

  const list = await repository.find();
  const imgs = [
    "https://i.pinimg.com/564x/6a/a9/5e/6aa95e1c2b83fd209160ff83e4ea77f2.jpg",
    "https://i.pinimg.com/564x/5a/43/1b/5a431b37c5380e9ef9a9b39318bdc33f.jpg",
    "https://i.pinimg.com/564x/7e/a5/dd/7ea5dd92f9092470066f20a081489527.jpg",
    "https://i.pinimg.com/564x/76/2c/27/762c27c19d3a7db54c0665ac81808c4e.jpg",
    "https://i.pinimg.com/736x/e5/75/90/e57590ed84b0cd1855c4182ef4822b7e.jpg",
    "https://i.pinimg.com/564x/0c/76/ee/0c76ee06c1f04a638a16ef85ed766782.jpg",
    "https://i.pinimg.com/564x/a9/02/a3/a902a30942944a19ebf6e56d8bc31ad0.jpg",
    "https://i.pinimg.com/564x/cf/7f/57/cf7f5754223b25a9d600ee1f6e2fba4e.jpg",
    "https://i.pinimg.com/564x/b3/2c/a8/b32ca85a495fa103b0d41e53bde0846c.jpg",
    "https://i.pinimg.com/564x/cd/43/e1/cd43e1a396f704f7ac0c800b8e0cfd2b.jpg",
    "https://i.pinimg.com/564x/a0/db/36/a0db36e19f0d55d23af5ef0e1ffae769.jpg",
    "https://i.pinimg.com/564x/32/51/8a/32518a6dd375168a91fc9cff0a02d1c7.jpg",
    "https://i.pinimg.com/564x/39/2c/09/392c09d63905f06caf116db2a79acd82.jpg",
    "https://i.pinimg.com/564x/fb/21/46/fb21469a18432d5ae6b006c6b6501f22.jpg",
    "https://i.pinimg.com/564x/2f/4e/3c/2f4e3cbd37b897b9e989bac47e2eec25.jpg",
    "https://i.pinimg.com/736x/2b/3c/09/2b3c09db3ce3f121bb439245e19bf4f0.jpg",
    "https://i.pinimg.com/564x/a3/8e/68/a38e6800410f2a2b4ad6e63a40f652ad.jpg",
    "https://i.pinimg.com/736x/65/87/c0/6587c0c0bd45eb007cae31712030028b.jpg",
    "https://i.pinimg.com/564x/25/7a/3d/257a3d05d1024553a75ec27802a3780d.jpg",
    "https://i.pinimg.com/736x/70/4a/7d/704a7d380e715246419536ef0a4ad621.jpg",
    "https://i.pinimg.com/564x/53/ca/e9/53cae90dfa7a34beac6beb38f4327dac.jpg",
    "https://i.pinimg.com/564x/73/a1/8a/73a18a0e331899f8d2e79bf284a3e21d.jpg",
    "https://i.pinimg.com/564x/df/d8/50/dfd850afaf5fd89e4c492cdfb422745b.jpg",
    "https://i.pinimg.com/564x/55/3b/2c/553b2c6fd756fde64e0bf382de567f9c.jpg",
    "https://i.pinimg.com/564x/18/ff/9a/18ff9ac323cfe31366e324258ff425b0.jpg",
    "https://i.pinimg.com/564x/6d/86/4d/6d864d845a18afbd839bafcf814026dc.jpg",
    "https://i.pinimg.com/564x/9f/9c/dc/9f9cdc021e213b471c3bdfeddba99f2b.jpg",
    "https://i.pinimg.com/564x/e8/3d/15/e83d159bcd728a06d84b99902379aee6.jpg",
    "https://i.pinimg.com/564x/e5/2d/c0/e52dc03db31e7df5ac5fff89c25e6365.jpg",
    "https://i.pinimg.com/564x/64/91/fd/6491fd5476e15e1b3275b549a3eaba77.jpg",
    "https://i.pinimg.com/564x/32/d3/5b/32d35beb51b8dbc537f238c2cdc82d42.jpg",
    "https://i.pinimg.com/564x/b7/da/88/b7da88ad284dce3b37e706f2e63c5aad.jpg",
  ];
  // await AppDataSource.createQueryBuilder()
  //   .update(Product)
  //   .set({
  //     thumbnail:
  //       "https://i.pinimg.com/originals/fa/d1/fb/fad1fba9f7773370c8373f941302573a.jpg",
  //   })
  //   .execute();
  // Promise.allSettled(
  //   new Array(24).fill("").map((_: string, index: number) => {
  //     return repository.update(
  //       { id: index + 1 },
  //       { thumbnail: imgs[24 % index] }
  //     );
  //   })
  // );
  // Promise.allSettled(
  //   new Array(24).fill("").map((_: string, index: number) => {
  //     return repository.update(
  //       { id: index + 1 },
  //       {
  //         groupProductId: (index % 7) + 1,
  //         thumbnail: imgs[index % 24] || imgs[index % 12],
  //       }
  //     );
  //   })
  // );

  if (list.length === 0) {
    // repository.save(
    //   new Array(24).fill("").map((_: string, index: number) => ({
    //     name: `Mặt hàng ${index + 1}`,
    //     slug: slugify(`Mặt hàng ${index + 1}`),
    //     thumbnail:
    //       "https://scontent.fsgn8-2.fna.fbcdn.net/v/t39.30808-6/308161063_394177769577123_3560558019291503964_n.jpg?stp=cp6_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=Jg23nplMT6UAX_FtUsO&_nc_ht=scontent.fsgn8-2.fna&oh=00_AfCO_p3J98bV4ed3z2-B7GSWNAL-ECERQXTQt2d8v8exLQ&oe=637F26D5",
    //     price: 120000 + index * 10000,
    //   }))
    // );
    repository.save(
      new Array(96).fill("").map((_: string, index: number) => ({
        name: `Mặt hàng ${index + 1}`,
        slug: slugify(`Mặt hàng ${index + 1}`, { lower: true }),
        groupProductId: (index % 7) + 1,
        thumbnail: imgs[index % imgs.length] || imgs[0],
        price: 200000 + index * 10000,
        quantity: 20,
      }))
    );
  }
};
