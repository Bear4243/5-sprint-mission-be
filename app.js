import * as dotenv from "dotenv";
import express from "express";
import router from "./routes/index.js";
import cors from "cors";
dotenv.config();

//prisma orm 사용 준비
const app = express();
app.use(express.json());
app.use(cors());

app.use("/", router);

console.log("서버 시작");

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server Started :${port}`));
