import { OrderDiscount } from "../entities/orderdiscount.entity";

export const orderDiscountSeed = async () => {
  const list = await OrderDiscount.find();
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
    const time = new Date().getTime();
    OrderDiscount.save([
      {
        code: "DUYDUS",
        end: new Date(time + 1000 * 60 * 60 * 24 * 30),
        minPrice: 200000,
        value: 50000,
      },
    ]);
  }
};
