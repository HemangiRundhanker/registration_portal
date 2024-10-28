/*
  Warnings:

  - You are about to drop the column `University` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `githubProfile` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `linkedinProfile` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `referralCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "University",
DROP COLUMN "githubProfile",
DROP COLUMN "linkedinProfile",
DROP COLUMN "referralCode",
DROP COLUMN "teamId",
ADD COLUMN     "program" TEXT,
ADD COLUMN     "school" TEXT;
