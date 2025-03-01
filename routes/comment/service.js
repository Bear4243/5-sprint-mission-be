import prisma from "../../prismaClient.js";
import { assert } from "superstruct";
import { validation } from "./structs.js";

const uploadComment = async (req, res, next) => {
  assert(req.body, validation); // 유효성 검사
  console.log("댓글 등록");
  try {
    const data = await prisma.comment.create({
      data: req.body,
    });
    res.json(data); // 헤더를 자동으로 Content-Type: application/json 설정해줌
  } catch (err) {
    next(err);
  }
};

const updateComment = async (req, res, next) => {
  const { id } = req.params;
  const { contents } = req.body;

  console.log("댓글 수정 시도:", id);

  try {
    const data = await prisma.comment.update({
      where: { id },
      data: { contents },
    });

    console.log("댓글 수정 성공:", data);
    res.status(200).json(data); // 수정된 데이터를 응답으로 보냄
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  const { id } = req.params;
  console.log("댓글 삭제");
  try {
    const data = await prisma.comment.delete({
      where: { id },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const service = {
  uploadComment,
  updateComment,
  deleteComment,
};

export default service;
