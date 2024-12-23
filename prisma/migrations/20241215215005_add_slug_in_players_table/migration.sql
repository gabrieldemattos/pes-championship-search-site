/*
  Warnings:

  - Added the required column `slug` to the `Players` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Players" ADD COLUMN     "slug" TEXT NOT NULL;
