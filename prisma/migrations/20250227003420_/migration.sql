/*
  Warnings:

  - Made the column `img` on table `BulletinBoard` required. This step will fail if there are existing NULL values in that column.
  - Made the column `like` on table `BulletinBoard` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BulletinBoard" ALTER COLUMN "img" SET NOT NULL,
ALTER COLUMN "like" SET NOT NULL;

-- CreateIndex
CREATE INDEX "BulletinBoard_userId_idx" ON "BulletinBoard"("userId");

-- CreateIndex
CREATE INDEX "BulletinBoard_createdAt_idx" ON "BulletinBoard"("createdAt");
