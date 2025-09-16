"use client";

import { Players } from "@prisma/client";
import { PlayerRow } from "./player-row";

interface PlayersResultsProps {
  players: Players[];
}

const PlayersResults = ({ players }: PlayersResultsProps) => {
  return (
    <div className="space-y-4">
      {players.map((player) => (
        <PlayerRow key={player.id} player={player} />
      ))}
    </div>
  );
};

export default PlayersResults;
