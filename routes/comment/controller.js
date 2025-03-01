import express from "express";
import service from "./service.js";
import { errorHandler } from "../middleWare/errorHandler.js";

const router = express.Router();
// 댓글
router.post("/Register", service.uploadComment);
router.patch("/modify", service.updateComment);
router.delete("/delete", service.deleteComment);

router.use(errorHandler);

export default router;
