import express from "express";
import service from "./service.js";
import { errorHandler } from "../middleWare/errorHandler.js";

const router = express.Router();
// 댓글
router.post("/", service.uploadComment);
router.patch("/", service.updateComment);
router.delete("/", service.deleteComment);

router.use(errorHandler);

export default router;
