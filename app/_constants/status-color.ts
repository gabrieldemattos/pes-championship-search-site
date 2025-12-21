import { Players } from "@prisma/client";

export const injuryTextColor = (player: Players) => {
  if (player?.injuryTolerance === "A") return "text-red-500";
  if (player?.injuryTolerance === "B") return "text-yellow-500";
  return;
};

export const conditionAndWeekTextColor = (value: number) => {
  if (value === 7) return "text-orange-500";
  if (value === 8) return "text-red-500";
  return "text-white";
};

export const valueColor = (value: number) => {
  if (value >= 75 && value < 90) return "text-yellow-500";
  if (value >= 90 && value < 95) return "text-orange-500";
  if (value >= 95) return "text-red-500";
  return "text-white";
};
