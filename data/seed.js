import prisma from "../prismaClient.js";
// import { faker } from '@faker-js/faker'; 다음에 써볼놈

async function main() {
  console.log("기존 데이터 초기화 시작");

  // 순서 중요! 외래 키 제약 조건을 고려하여 자식 테이블부터 삭제
  await prisma.comment.deleteMany();
  await prisma.bulletinBoard.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  console.log("기존 데이터 초기화 완료");

  // 새 데이터 생성
  console.log("새 데이터 추가 시작");

  // 유저 생성
  const user1 = await prisma.user.create({
    data: {
      email: "user1@example.com",
      nickName: "user1",
      password: "password123",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "user2@example.com",
      nickName: "user2",
      password: "password456",
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: "user3@example.com",
      nickName: "user3",
      password: "password789",
    },
  });

  // 상품 생성
  const product1 = await prisma.product.create({
    data: {
      title: "iPhone 15",
      price: 1200000,
      like: 10,
      description: "최신 iPhone 15, 미개봉 제품",
      tags: "전자제품, 휴대폰",
    },
  });

  const product2 = await prisma.product.create({
    data: {
      title: "MacBook Pro",
      price: 2500000,
      like: 20,
      description: "M2 MacBook Pro 16인치",
      tags: "노트북, 애플",
    },
  });

  // 게시글 생성
  const post1 = await prisma.bulletinBoard.create({
    data: {
      title: "iPhone 15 중고 팝니다",
      contents: "사용한지 3개월 된 아이폰 15 판매합니다.",
      like: 5,
      userId: user1.id,
    },
  });

  const post2 = await prisma.bulletinBoard.create({
    data: {
      title: "MacBook Pro1 새제품 할인 판매",
      contents: "맥북 프로 새 제품 할인 판매합니다.",
      like: 8,
      userId: user2.id,
    },
  });

  const post3 = await prisma.bulletinBoard.create({
    data: {
      title: "MacBook Pro2 새제품 할인 판매",
      contents: "맥북 프로 새 제품 할인 판매합니다.",
      like: 10,
      userId: user2.id,
    },
  });

  const post4 = await prisma.bulletinBoard.create({
    data: {
      title: "MacBook Pro3 새제품 할인 판매",
      contents: "맥북 프로 새 제품 할인 판매합니다.",
      like: 13,
      userId: user2.id,
    },
  });

  const post5 = await prisma.bulletinBoard.create({
    data: {
      title: "MacBook Pro4 새제품 할인 판매",
      contents: "맥북 프로 새 제품 할인 판매합니다.",
      like: 8,
      userId: user3.id,
    },
  });

  const post6 = await prisma.bulletinBoard.create({
    data: {
      title: "MacBook Pro55555 새제품 할인 판매",
      contents: "맥북 프로 새 제품 할인 판매합니다.",
      like: 19,
      userId: user3.id,
    },
  });

  const post7 = await prisma.bulletinBoard.create({
    data: {
      title: "MacBook Pro666666 새제품 할인 판매",
      contents: "맥북 프로 새 제품 할인 판매합니다.",
      like: 8,
      userId: user1.id,
    },
  });

  const post8 = await prisma.bulletinBoard.create({
    data: {
      title: "MacBook Pro777777 새제품 할인 판매",
      contents: "맥북 프로 새 제품 할인 판매합니다.",
      like: 20,
      userId: user1.id,
    },
  });

  const post9 = await prisma.bulletinBoard.create({
    data: {
      title: "MacBook Pro888888 새제품 할인 판매",
      contents: "맥북 프로 새 제품 할인 판매합니다.",
      like: 21,
      userId: user2.id,
    },
  });

  const post10 = await prisma.bulletinBoard.create({
    data: {
      title: "MacBook Pro999999999 새제품 할인 판매",
      contents: "맥북 프로 새 제품 할인 판매합니다.",
      like: 8,
      userId: user3.id,
    },
  });

  const post11 = await prisma.bulletinBoard.create({
    data: {
      title: "MacBook Proaaaa 새제품 할인 판매",
      contents: "맥북 프로 새 제품 할인 판매합니다.",
      like: 23,
      userId: user3.id,
    },
  });

  const post12 = await prisma.bulletinBoard.create({
    data: {
      title: "MacBook Probbbbb 새제품 할인 판매",
      contents: "맥북 프로 새 제품 할인 판매합니다.",
      like: 40,
      userId: user2.id,
    },
  });

  // 댓글 생성
  await prisma.comment.create({
    data: {
      contents: "댓글1",
      userId: user2.id,
      WritingId: post1.id,
    },
  });

  await prisma.comment.create({
    data: {
      contents: "댓글2",
      userId: user1.id,
      WritingId: post1.id,
    },
  });

  await prisma.comment.create({
    data: {
      contents: "댓글3",
      userId: user2.id,
      WritingId: post3.id,
    },
  });

  await prisma.comment.create({
    data: {
      contents: "댓글4",
      userId: user3.id,
      WritingId: post2.id,
    },
  });

  await prisma.comment.create({
    data: {
      contents: "댓글5",
      userId: user1.id,
      WritingId: post2.id,
    },
  });

  console.log("되었나?");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
