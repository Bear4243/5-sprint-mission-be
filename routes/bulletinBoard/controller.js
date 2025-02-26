import express from "express";
import service from "./service.js";

const router = express.Router();

router.get("/", service.uploadBulletinBoard);
router.post("/Register", service.uploadBulletinBoard);
router.patch("/dd", service.updateBulletinBoard);
router.delete("/ee", service.deleteBulletinBoard);

export default router;
