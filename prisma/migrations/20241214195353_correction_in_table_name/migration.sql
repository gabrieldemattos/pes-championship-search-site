/*
  Warnings:

  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Player";

-- CreateTable
CREATE TABLE "Players" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "strongerFoot" TEXT NOT NULL,
    "positions" TEXT[],
    "favouredSide" TEXT NOT NULL,
    "injuryTolerance" TEXT NOT NULL,
    "attack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    "stamina" INTEGER NOT NULL,
    "topSpeed" INTEGER NOT NULL,
    "acceleration" INTEGER NOT NULL,
    "response" INTEGER NOT NULL,
    "agility" INTEGER NOT NULL,
    "dribbleAccuracy" INTEGER NOT NULL,
    "dribbleSpeed" INTEGER NOT NULL,
    "shortPassAccuracy" INTEGER NOT NULL,
    "shortPassSpeed" INTEGER NOT NULL,
    "longPassAccuracy" INTEGER NOT NULL,
    "longPassSpeed" INTEGER NOT NULL,
    "shotAccuracy" INTEGER NOT NULL,
    "shotPower" INTEGER NOT NULL,
    "shotTechnique" INTEGER NOT NULL,
    "freeKickAccuracy" INTEGER NOT NULL,
    "swerve" INTEGER NOT NULL,
    "heading" INTEGER NOT NULL,
    "jump" INTEGER NOT NULL,
    "technique" INTEGER NOT NULL,
    "mentality" INTEGER NOT NULL,
    "goalKeeperSkills" INTEGER NOT NULL,
    "teamwork" INTEGER NOT NULL,
    "aggression" INTEGER NOT NULL,
    "consistency" INTEGER NOT NULL,
    "conditionFitness" INTEGER NOT NULL,
    "weakFootAccuracy" INTEGER NOT NULL,
    "weakFootFrequency" INTEGER NOT NULL,
    "stars" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Players_pkey" PRIMARY KEY ("id")
);
