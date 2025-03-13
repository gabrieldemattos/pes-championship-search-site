-- CreateTable
CREATE TABLE "Champion" (
    "id" TEXT NOT NULL,
    "playerOwner" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "finalScore" TEXT NOT NULL,
    "highlightPlayerSlug" TEXT NOT NULL,
    "highlightPlayerImage" TEXT NOT NULL,
    "teamPlayersSlugs" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Champion_pkey" PRIMARY KEY ("id")
);
