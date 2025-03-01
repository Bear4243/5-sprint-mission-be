import express from "express";
import service from "./service.js";
import { errorHandler } from "../middleWare/errorHandler.js";

const router = express.Router();

router.get("/", service.getProduct);

router.use(errorHandler);

export default router;
