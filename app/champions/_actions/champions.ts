"use server";

import { db } from "@/app/_lib/prisma";

export const champions = async () => {
  const champions = await db.champion.findMany();

  return champions;
};
