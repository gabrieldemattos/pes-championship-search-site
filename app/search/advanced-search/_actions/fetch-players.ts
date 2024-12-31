"use server";

import { db } from "@/app/_lib/prisma";

interface PlayerFilters {
  status?: {
    [key: string]: {
      min?: number;
      max?: number;
    };
  };
  positions?: string[];
  stars?: string[];
  height?: {
    min?: number;
    max?: number;
  };
  foot?: string;
}

export async function fetchPlayers(filters: PlayerFilters) {
  const { status = {}, positions = [], stars = [], height, foot } = filters;

  if (
    Object.keys(status).length === 0 &&
    positions.length === 0 &&
    stars.length === 0 &&
    (!height ||
      (height.min === undefined && height.max === undefined) ||
      (height.min === 0 && height.max === 0)) &&
    foot === ""
  )
    return;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};

  Object.keys(status).forEach((key) => {
    const { min, max } = status[key];
    if (min || max) {
      where[key] = {
        gte: min || undefined,
        lte: max || undefined,
      };
    }
  });

  if (positions.length > 0) {
    where.positions = {
      hasEvery: positions,
    };
  }

  if (stars.length > 0) {
    where.stars = {
      hasEvery: stars,
    };
  }

  if (height?.min || height?.max) {
    where.height = {
      gte: height.min ? parseFloat((height.min / 100).toFixed(2)) : 1.6,
      lte: height.max ? parseFloat((height.max / 100).toFixed(2)) : 2.1,
    };
  }

  if (foot !== "") {
    where.strongerFoot = {
      equals: foot,
      mode: "insensitive",
    };
  }

  try {
    const players = await db.players.findMany({
      where,
      orderBy: {
        name: "asc",
      },
    });

    return players;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw new Error("Failed to fetch players.");
  }
}
