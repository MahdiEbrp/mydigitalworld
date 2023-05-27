/*
  Warnings:

  - Made the column `createdAt` on table `Feedback` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Feedback" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Gallery" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
