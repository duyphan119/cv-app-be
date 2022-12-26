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
import seed from "./seeds";
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
        origin: true,
        credentials: true,
      })
    );

    seed();

    app.use(routes);
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  })
  .catch((error) => console.log(error));
