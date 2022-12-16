import { Request, Response, Router } from "express";
import * as fs from "fs";
import * as https from "https";
import { upload } from "../../middlewares/upload.middleware";
import { BASE_ASSETS_IMAGES } from "../../constants";
import { generateFolder } from "../../utils";
import { promisify } from "util";
import { getCloudinary } from "../../cloudinary";
// import cloudinary from "cloudinary";
const router = Router();
// const cloud_name = "dwhjftwvw";
// const api_key = "335652142568654";
// const api_secret = "rVXHGRE29TukCR3eUxZEyJlv3ME";
router.post(
  "/single",
  upload.single("image"),
  async (req: Request, res: Response) => {
    if (req.file) {
      // cloudinary.v2.config({
      //   api_key,
      //   api_secret,
      //   cloud_name,
      // });
      const img = await getCloudinary().v2.uploader.upload(req.file.path, {
        folder: "cv-app/" + generateFolder(new Date()),
      });
      const unlinkAsync = promisify(fs.unlink);
      const path = __dirname.split("dist")[0];

      console.log({ __dirname, path, filePath: req.file.path });
      console.log(path, req.file.path);
      await unlinkAsync(path + "/" + req.file.path);
      return res.status(201).json({ code: 200, message: "Success", data: img });
      // res.status(201).json({ path: req.file.path });
    } else {
      res.status(500).json({ code: 500, message: `Error` });
    }
  }
);

router.post(
  "/multiple",
  upload.array("images"),
  async (req: Request, res: Response) => {
    try {
      if (req.files) {
        const result = [];
        const unlinkAsync = promisify(fs.unlink);
        const path = __dirname.split("dist")[0];
        const files = req.files as Express.Multer.File[];
        const promises = [];
        const promiseImgs = [];
        console.log(files, path);
        for (let i = 0; i < files.length; i++) {
          const filePath = files[i].path;
          result.push({ path: filePath });
          promiseImgs.push(
            getCloudinary().v2.uploader.upload(filePath, {
              folder: "cv-app/" + generateFolder(new Date()),
            })
          );
          promises.push(unlinkAsync(path + "/" + filePath));
        }
        const resultImgs = await Promise.all(promiseImgs);
        await Promise.all(promises);

        return res
          .status(201)
          .json({ code: 201, message: "Success", data: resultImgs });
      }
    } catch (error) {
      console.log(error);
    }
    return res.status(500).json({ code: 500, message: `Error` });
  }
);

// router.post("/url", (req: Request, res: Response) => {
//   const folderName = generateFolder(new Date());
//   fs.mkdirSync(`./${BASE_ASSETS_IMAGES}${folderName}`, { recursive: true });
//   const filename = new Date().getTime() * Math.random();
//   const file = fs.createWriteStream(
//     `${BASE_ASSETS_IMAGES}${folderName}${filename}.jpg`
//   );

//   https.get(req.body.image, function (response) {
//     response.pipe(file);

//     file.on("finish", () => {
//       file.close();
//       res.status(200).json({
//         path: `${BASE_ASSETS_IMAGES}${folderName}${filename}.jpg`,
//       });
//     });
//   });
// });

export default router;
