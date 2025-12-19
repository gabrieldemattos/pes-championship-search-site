"use server";

import { db } from "@/app/_lib/prisma";

export async function searchPlayers(queryData: FormData) {
  const search = String(queryData.get("search"));

  if (!search) return [];

  const playersResults = await db.players.findMany({
    where: {
      OR: [
        {
          slug: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  return playersResults;
}
