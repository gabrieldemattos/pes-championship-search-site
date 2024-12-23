import { cn } from "@/app/_lib/utils";
import { Players } from "@prisma/client";
import PlayerButton from "./player-button";

interface PlayerAccordingToPositionProps {
  position: string;
  playerPositions: string[];
  players: Players[];
  className?: string;
}

const PlayerAccordingToPosition = ({
  position,
  playerPositions,
  players,
  className,
}: PlayerAccordingToPositionProps) => {
  return (
    <div>
      <h2
        className={cn(
          "uppercase text-center text-lg font-bold border-b-8 p-1 bg-gray-600 bg-opacity-80",
          className
        )}
      >
        {position}
      </h2>

      <PlayerButton
        playerPositions={playerPositions}
        players={players}
        className={className}
      />
    </div>
  );
};

export default PlayerAccordingToPosition;
