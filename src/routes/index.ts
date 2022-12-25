import { Router } from "express";
import childRouter from "./v1";

const router = Router();
router.get("/", (req, res) => res.send("CV APP API"));
router.use("/v1", childRouter);

export default router;
