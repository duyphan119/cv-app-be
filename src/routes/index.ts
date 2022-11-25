import { Router } from "express";
import childRouter from "./v1";

const router = Router();

router.use("/v1", childRouter);

export default router;
