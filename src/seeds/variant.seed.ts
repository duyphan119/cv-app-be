import { AppDataSource } from "../data-source";
import { Variant } from "../entities/variant.entity";

export const variantSeed = async () => {
  const repository = AppDataSource.getRepository(Variant);

  const list = await repository.find();
  if (list.length === 0) {
    repository.save([
      {
        name: "Màu sắc",
      },
      {
        name: "Kích cỡ",
      },
    ]);
  }
};
