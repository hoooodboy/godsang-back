import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();
const port = 3000;

// CORS 설정
app.use(cors());
app.use(express.json()); // JSON 파싱 미들웨어

// 카운터 값을 가져오는 API
app.get("/counter", async (req, res) => {
  const counter = await prisma.counter.findFirst(); // 첫 번째 카운터 레코드 가져오기
  res.json(counter);
});

// 카운터를 증가시키는 API
app.post("/increment", async (req, res) => {
  let counter = await prisma.counter.findFirst();

  if (!counter) {
    counter = await prisma.counter.create({ data: { count: 1 } });
  } else {
    counter = await prisma.counter.update({
      where: { id: counter.id },
      data: { count: counter.count + 1 },
    });
  }

  res.json(counter);
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
