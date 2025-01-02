"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export async function editPlayer(_: unknown, queryData: FormData) {
  const id = String(queryData.get("id"));
  const ownerName = String(queryData.get("owner-name"));
  const ownerSlug = String(queryData.get("owner-slug"));

  if (!ownerName || !ownerSlug || !id) return;

  const editeredPlayer = await db.players.update({
    where: {
      id,
    },
    data: {
      playerOwner: ownerName,
      playerOwnerSlug: ownerSlug,
    },
  });

  revalidatePath("/admin-dashboard");

  return editeredPlayer;
}
