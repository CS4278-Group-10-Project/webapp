/*
  Warnings:

  - You are about to drop the column `picture_url` on the `Badge` table. All the data in the column will be lost.
  - You are about to drop the column `course_code` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profile_pic` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `standindg` on the `User` table. All the data in the column will be lost.
  - Added the required column `pictureUrl` to the `Badge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseCode` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Badge" DROP COLUMN "picture_url",
ADD COLUMN     "pictureUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "course_code",
ADD COLUMN     "courseCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Program" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "first_name",
DROP COLUMN "last_name",
DROP COLUMN "passwordHash",
DROP COLUMN "profile_pic",
DROP COLUMN "standindg",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "profilePic" TEXT,
ADD COLUMN     "standing" "StudentStanding";

-- CreateTable
CREATE TABLE "Password" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "Password_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
