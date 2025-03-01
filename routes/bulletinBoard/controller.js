import express from "express";
import service from "./service.js";
import { errorHandler } from "../middleWare/errorHandler.js";

const router = express.Router();

router.get("/", service.getBulletinBoard);
router.get("/topLike", service.getTopBulletinBoard);
router.post("/Register", service.uploadBulletinBoard);
router.patch("/modify", service.updateBulletinBoard);
router.delete("/delete", service.deleteBulletinBoard);

router.use(errorHandler);

export default router;
