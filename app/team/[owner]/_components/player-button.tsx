"use client";

import { lineupPositionColors } from "@/app/_constants/position-colors";
import { cn } from "@/app/_lib/utils";
import { Players } from "@prisma/client";
import Link from "next/link";

interface PlayerButtonProps {
  playerPositions: string[];
  players: Players[];
  className?: string;
}
const PlayerButton = ({
  playerPositions,
  players,
  className,
}: PlayerButtonProps) => {
  return (
    <div>
      {players.map(
        (player) =>
          playerPositions.includes(player.mainPosition) && (
            <Link
              key={player.id}
              href={`/player/${player.id}`}
              className="border-b p-1 flex items-center gap-1 hover:bg-slate-800"
            >
              <p
                className={cn(
                  `${
                    lineupPositionColors[player.mainPosition]
                  } border-b-4 h-fit rounded-md font-bold w-12 text-center`,
                  className
                )}
              >
                {player.mainPosition}
              </p>

              <p className="text-left pl-2 text-[13px] font-semibold capitalize sm:text-base">
                {player.name}
              </p>
            </Link>
          )
      )}
    </div>
  );
};

export default PlayerButton;
