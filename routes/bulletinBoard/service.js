import prisma from "@/prismaClient.js";
import Err from "./err.js";
import { assert } from "superstruct";
import { validation } from "./structs.js";

const getBulletinBoard = async (req, res) => {
  try {
    const { sort } = req.query;
    // 기본값은 최신순(createdAt desc)
    let orderByOption = { createdAt: "desc" };
    if (sort === "like") {
      orderByOption = { like: "desc" };
    }

    const data = await prisma.bulletinBoard.findMany({
      include: {
        comment: true, // 게시글의 댓글도 함께 불러옴 (선택사항)
        user: true, // 작성자 정보도 포함
      },
      orderBy: orderByOption,
    });
    res.json(data);
  } catch (err) {
    Err(err, res);
  }
};

const uploadBulletinBoard = async (req, res) => {
  assert(req.body, validation); // 유효성 검사

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "User id is required" });
  }

  console.log("게시글 등록");
  try {
    const data = await prisma.bulletinBoard.create({
      data: {
        ...req.body,
        userId: id,
      },
    });
    res.json(data);
  } catch (err) {
    Err(err, res);
  }
};

const updateBulletinBoard = async (req, res) => {
  const { id } = req.params;
  // 스키마의 필드명이 "contents"이므로 수정 시에도 이를 사용합니다.
  const { title, contents } = req.body;

  console.log("게시글 수정 시도:", id);

  try {
    const data = await prisma.bulletinBoard.update({
      where: { id },
      data: { title, contents },
    });

    console.log("게시글 수정 성공:", data);
    res.status(200).json(data); // 수정된 데이터를 응답으로 보냄
  } catch (err) {
    console.error("게시글 수정 실패:", err);
    Err(err, res); // 에러 처리
  }
};

const deleteBulletinBoard = async (req, res) => {
  const { id } = req.params;
  console.log("게시글 삭제");
  try {
    await prisma.bulletinBoard.delete({
      where: { id },
    });
    res.sendStatus(204);
  } catch (err) {
    Err(err, res);
  }
};

const service = {
  getBulletinBoard,
  uploadBulletinBoard,
  updateBulletinBoard,
  deleteBulletinBoard,
};

export default service;
