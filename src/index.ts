require("dotenv").config();
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";
import "reflect-metadata";
import { __prod__ } from "./constants";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import { groupProductSeed } from "./seeds/groupproduct.seed";
import { productSeed } from "./seeds/product.seed";
import { productVariantSeed } from "./seeds/productvariant.seed";
import { productVariantImageSeed } from "./seeds/productvariantimage.seed";
import { userSeed } from "./seeds/user.seed";
import { variantSeed } from "./seeds/variant.seed";
import { variantValueSeed } from "./seeds/variantvalue.seed";
let PORT = "8080";
if (process.env.PORT) {
  PORT = process.env.PORT;
}

AppDataSource.initialize()
  .then(async (db) => {
    if (__prod__) await db.runMigrations();
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "../")));
    app.use(
      cors({
        origin: __prod__
          ? process.env.CORS_ORIGIN_PROD
          : process.env.CORS_ORIGIN_DEV,
        credentials: true,
      })
    );

    await userSeed();
    await variantSeed();
    await variantValueSeed();
    await groupProductSeed();
    await productSeed();
    await productVariantSeed();
    await productVariantImageSeed();

    app.use(routes);
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  })
  .catch((error) => console.log(error));
