/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Password` will be added. If there are existing duplicate values, this will fail.
  - Made the column `standing` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Password" DROP CONSTRAINT "Password_userId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "standing" SET NOT NULL,
ALTER COLUMN "standing" SET DEFAULT 'FRESHMAN';

-- CreateIndex
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
