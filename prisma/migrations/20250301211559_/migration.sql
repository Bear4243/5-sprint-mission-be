/*
  Warnings:

  - Made the column `like` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BulletinBoard" ALTER COLUMN "img" DROP NOT NULL,
ALTER COLUMN "img" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "img" DROP DEFAULT,
ALTER COLUMN "like" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profileImg" DROP DEFAULT;
