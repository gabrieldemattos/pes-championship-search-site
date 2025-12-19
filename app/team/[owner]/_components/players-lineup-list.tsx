import { Players } from "@prisma/client";
import PlayerLineupItem from "./player-lineup-item";

const PlayersLineupList = ({ players }: { players: Players[] }) => {
  return (
    <div className="flex gap-3 overflow-x-scroll pb-5 text-black [&::-webkit-scrollbar]:h-4 [&::-webkit-scrollbar-thumb]:rounded-md [&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-track]:bg-gray-400 [&::-webkit-scrollbar-track]:rounded-md">
      {players.map((p) => (
        <PlayerLineupItem key={p.id} player={p} />
      ))}
    </div>
  );
};

export default PlayersLineupList;
