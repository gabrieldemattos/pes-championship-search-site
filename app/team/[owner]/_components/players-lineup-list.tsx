import { Players } from "@prisma/client";
import PlayerLineupItem from "./player-lineup-item";

const PlayersLineupList = ({ players }: { players: Players[] }) => {
  return (
    <div className="flex gap-3 overflow-x-scroll pb-5 text-black">
      {players.map((p) => (
        <PlayerLineupItem key={p.id} player={p} />
      ))}
    </div>
  );
};

export default PlayersLineupList;
