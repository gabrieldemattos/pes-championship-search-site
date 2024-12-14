/*
  Warnings:

  - Added the required column `mainPosition` to the `Players` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Players" ADD COLUMN     "mainPosition" TEXT NOT NULL;
