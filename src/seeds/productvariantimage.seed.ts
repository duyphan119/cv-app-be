import { ProductVariant } from "../entities/productvariant.entity";
import { AppDataSource } from "../data-source";
import { ProductVariantImage } from "../entities/productvariantimage.entity";
import { Variant } from "../entities/variant.entity";

const images: string[] = [
  "https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-6/316204410_2021789171351808_8685112609790903973_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=730e14&_nc_ohc=8r4MWCMMiI0AX_aEBdq&_nc_ht=scontent.fsgn13-4.fna&oh=00_AfB_umOmyDm3DDxowUxJydHI_GTi3Tv1mwDMNPTvokuMfA&oe=637ED8B5",
  "https://scontent.fsgn13-3.fna.fbcdn.net/v/t39.30808-6/316409967_2021660864697972_5955636722502340444_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=wLY9eKDMuL8AX8Z4bgz&_nc_ht=scontent.fsgn13-3.fna&oh=00_AfDib-9YYtLgiRwfIOEFgVZ2Wv83Od0aEUt_ueTuLttUgA&oe=637EBBAE",
  "https://scontent.fsgn8-2.fna.fbcdn.net/v/t39.30808-6/316172801_2021660844697974_7638053512150182904_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=pupbcBF4XgMAX80c5Vk&_nc_ht=scontent.fsgn8-2.fna&oh=00_AfBh3572ce6fakUbmmaTCljC0ZUQbIeXRbiN-cpOuCfUtA&oe=637FC9B4",
  "https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/316118362_2021660801364645_8632689238279061369_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=UWapu4PA6M0AX-C0Lte&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfDgzWKcc-zKIYloq-ZijuAVDsyLKDjAM8s19Sfdt74nzg&oe=637FED82",
  "https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-6/316527249_2021660784697980_1631927057766987609_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=FsIcTvsaVqsAX_CWCOD&_nc_ht=scontent.fsgn13-4.fna&oh=00_AfDbwvINsJSK-MWfbFsiMjdYlehj7mch3WkKzD6CRS-sLQ&oe=637E324A",
  "https://scontent.fsgn13-3.fna.fbcdn.net/v/t39.30808-6/316290753_2021659398031452_6870118653565264552_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=Iwy-Vc_oqaAAX_Kg51j&_nc_oc=AQnQWryQ7TW7wzOyhtdc5KUduWictvT1hLJlSk9W4Hs0K66afCtn3MZ3-p3DxAAi98g&_nc_ht=scontent.fsgn13-3.fna&oh=00_AfBa2x1gH5RKN_hj3AKQ4An9kygraCpx-TYJzIUVIt-Ifw&oe=637EF18C",
];
export const productVariantImageSeed = async () => {
  try {
    const repository1 = AppDataSource.getRepository(ProductVariantImage);
    const varaintRepository = AppDataSource.getRepository(Variant);
    const arr: any[] = [];
    if ((await repository1.find()).length === 0) {
      const trang = await varaintRepository.findOne({ where: { name: "Đỏ" } });
      const den = await varaintRepository.findOne({
        where: { name: "Xanh dương" },
      });
      if (trang && den) {
        new Array(72).fill("").forEach((_: string, index: number) => {
          images.forEach((image: string) => {
            arr.push({
              path: image,
              productId: 24 + index + 1,
              variantId: trang.id,
            });
          });
          images.forEach((image: string, idx: number) => {
            arr.push({
              path: images[images.length - idx - 1],
              productId: 24 + index + 1,
              variantId: den.id,
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
