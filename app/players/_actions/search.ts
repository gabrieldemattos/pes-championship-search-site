"use server";

import { db } from "@/app/_lib/prisma";

export const searchPlayers = async (query: string) => {
  const players = await db.players.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          slug: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  return JSON.parse(JSON.stringify(players));
};
