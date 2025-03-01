import prisma from "../../prismaClient.js";
import { assert } from "superstruct";
import { validation } from "./structs.js";

const formatToYMD = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};

const formatBulletinBoard = (board) => ({
  ...board,
  updatedAt: formatToYMD(board.updatedAt),
});

const getBulletinBoard = async (req, res, next) => {
  try {
    const { sort, cursor, limit } = req.query;
    const take = parseInt(limit) || 4;

    // 기본 정렬: 최신순(createdAt desc)
    let orderByOption = { createdAt: "desc" };
    if (sort === "like") {
      orderByOption = { like: "desc" };
    }

    const query = {
      include: {
        comment: true,
        user: true,
      },
      orderBy: orderByOption,
      take: take + 1, // 한 페이지보다 한 개 더 불러옴
    };

    if (cursor) {
      query.cursor = { id: cursor };
      query.skip = 1;
    }

    const results = await prisma.bulletinBoard.findMany(query);

    const formattedResults = results.map(formatBulletinBoard);

    let nextCursor = null;
    let data = formattedResults;
    if (formattedResults.length > take) {
      nextCursor = formattedResults[take].id;
      data = formattedResults.slice(0, take);
    }

    res.json({ data, nextCursor });
  } catch (err) {
    // err 변수명으로 에러 객체 받음
    next(err); // 에러 객체를 next에 전달
  }
};

const getTopBulletinBoard = async (req, res, next) => {
  try {
    const data = await prisma.bulletinBoard.findMany({
      include: {
        comment: true, // 게시글의 댓글도 함께 불러옴
        user: true, // 작성자 정보도 포함
      },
      orderBy: { like: "desc" },
      take: 3, // 상위 3개의 게시글만 선택
    });
    res.json(data.map(formatBulletinBoard));
  } catch (err) {
    next(err);
  }
};

const uploadBulletinBoard = async (req, res, next) => {
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
    res.json(formatBulletinBoard(data));
  } catch (err) {
    next(err);
  }
};

const updateBulletinBoard = async (req, res, next) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  console.log("게시글 수정 시도:", id);

  try {
    const data = await prisma.bulletinBoard.update({
      where: { id },
      data: { title, contents },
    });

    console.log("게시글 수정 성공:", data);
    res.status(200).json(formatBulletinBoard(data));
  } catch (err) {
    next(err);
  }
};

const deleteBulletinBoard = async (req, res, next) => {
  const { id } = req.params;
  console.log("게시글 삭제");
  try {
    await prisma.bulletinBoard.delete({
      where: { id },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const service = {
  getBulletinBoard,
  getTopBulletinBoard,
  uploadBulletinBoard,
  updateBulletinBoard,
  deleteBulletinBoard,
};

export default service;
