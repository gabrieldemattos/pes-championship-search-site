"use server";

import { db } from "@/app/_lib/prisma";

export const searchTeam = async (owner: string) => {
  const teamPlayers = await db.players.findMany({
    where: {
      OR: [
        {
          playerOwner: {
            contains: owner,
            mode: "insensitive",
          },
        },
        {
          playerOwnerSlug: {
            contains: owner,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  return teamPlayers;
};
