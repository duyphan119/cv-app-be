import { Variant } from "../entities/variant.entity";
import { GroupProduct } from "../entities/groupproduct.entity";
import { VariantValue } from "../entities/variantvalue.entity";
import { User } from "../entities/user.entity";
import { hash } from "../services/auth.service";
import { Product } from "../entities/product.entity";
import slugify from "slugify";
import { ProductVariant } from "../entities/productvariant.entity";

const seed = async () => {
  try {
    const checkAdmin = await User.findOneBy({ isAdmin: true });
    if (!checkAdmin) {
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

      const groupProducts = await GroupProduct.save([
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

      const vColor = await Variant.save({ name: "Màu sắc" });
      const vSize = await Variant.save({ name: "Kích cỡ" });

      const den = await VariantValue.save({
        variantId: vColor.id,
        value: "Đen",
      });
      const trang = await VariantValue.save({
        variantId: vColor.id,
        value: "Trắng",
      });
      const xanhla = await VariantValue.save({
        variantId: vColor.id,
        value: "Xanh Lá",
      });
      const xanhduong = await VariantValue.save({
        variantId: vColor.id,
        value: "Xanh Dương",
      });
      const dor = await VariantValue.save({
        variantId: vColor.id,
        value: "Đỏ",
      });
      const vang = await VariantValue.save({
        variantId: vColor.id,
        value: "Vàng",
      });
      const tim = await VariantValue.save({
        variantId: vColor.id,
        value: "Tím",
      });
      const cam = await VariantValue.save({
        variantId: vColor.id,
        value: "Cam",
      });
      const hong = await VariantValue.save({
        variantId: vColor.id,
        value: "Hồng",
      });
      const xam = await VariantValue.save({
        variantId: vColor.id,
        value: "Xám",
      });
      const nau = await VariantValue.save({
        variantId: vColor.id,
        value: "Nâu",
      });

      const xs = await VariantValue.save({ variantId: vSize.id, value: "XS" });
      const s = await VariantValue.save({ variantId: vSize.id, value: "S" });
      const m = await VariantValue.save({ variantId: vSize.id, value: "M" });
      const l = await VariantValue.save({ variantId: vSize.id, value: "L" });
      const xl = await VariantValue.save({ variantId: vSize.id, value: "XL" });
      const _2xl = await VariantValue.save({
        variantId: vSize.id,
        value: "2XL",
      });
      const _3xl = await VariantValue.save({
        variantId: vSize.id,
        value: "3XL",
      });
      const _4xl = await VariantValue.save({
        variantId: vSize.id,
        value: "4XL",
      });

      const xxx1: any = [
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
        [hong, s],
        [hong, m],
        [hong, l],
        [hong, xl],
        [cam, s],
        [cam, m],
        [cam, l],
        [cam, xl],
      ];
      const xxx4: any = [
        [tim, s],
        [tim, m],
        [tim, l],
        [tim, xl],
        [nau, s],
        [nau, m],
        [nau, l],
        [nau, xl],
      ];
      const xxx5: any = [
        [xanhla, s],
        [xanhla, m],
        [xanhla, l],
        [xanhla, xl],
        [xam, s],
        [xam, m],
        [xam, l],
        [xam, xl],
      ];
      const xxx6: any = [
        [vang, m],
        [vang, l],
        [vang, xl],
        [vang, _2xl],
        [xanhduong, m],
        [xanhduong, l],
        [xanhduong, xl],
        [xanhduong, _2xl],
      ];

      const xxx = [xxx1, xxx2, xxx3, xxx4, xxx5, xxx6];

      const connectVariantValues = (
        vv1: VariantValue,
        vv2: VariantValue
      ): string => {
        return `${vv1.value} / ${vv2.value}`;
      };

      const admin = await User.save({
        email: "duychomap123@gmail.com",
        password: await hash("123456"),
        fullName: "Phan Khánh Duy",
        phone: "0385981196",
        isAdmin: true,
      });
      const products = await Product.save(
        new Array(96).fill("").map((_: string, index: number) => ({
          name: `Mặt hàng ${index + 1}`,
          slug: slugify(`Mặt hàng ${index + 1}`, { lower: true }),
          groupProductId: (index % 7) + 1,
          thumbnail: imgs[index % imgs.length] || imgs[0],
          price: 200000 + index * 10000,
          quantity: 20,
        }))
      );

      const promises: any = [];
      products.forEach((product, index) => {
        const rXXX = xxx[index % xxx.length];
        rXXX.forEach((_xxx: any) => {
          promises.push(
            ProductVariant.save({
              productId: product.id,
              name: connectVariantValues(_xxx[0], _xxx[1]),
              inventory: 100,
              price: product.price,
              variantValues: _xxx,
            })
          );
        });
      });

      await Promise.all(promises);
    }
  } catch (error) {}
};

export default seed;
