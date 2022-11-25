import { GroupProduct } from "../entities/groupproduct.entity";
import { AppDataSource } from "../data-source";
import slugify from "slugify";

export const groupProductSeed = async () => {
  const repository = AppDataSource.getRepository(GroupProduct);

  const list = await repository.find();
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

  if (list.length === 0) {
    repository.save([
      {
        name: "Áo thun",
        slug: "ao-thun",
      },
      {
        name: "Áo sơ mi",
        slug: "ao-so-mi",
      },
      {
        name: "Áo polo",
        slug: "ao-polo",
      },
      {
        name: "Áo khoác",
        slug: "ao-khoac",
      },
      {
        name: "Quần tây",
        slug: "quan-tay",
      },
      {
        name: "Quần short",
        slug: "quan-short",
      },
      {
        name: "Quần kaki",
        slug: "quan-kaki",
      },
    ]);
  }
};
