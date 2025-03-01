import prisma from "../../prismaClient.js";

const getProduct = async (req, res, next) => {
  console.log("product get 호출");
  try {
    // const limit = parseInt(req.query.limit) || 10; // 기본값을 10으로 설정
    const data = await prisma.product.findMany();
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

const service = {
  getProduct,
};

export default service;
