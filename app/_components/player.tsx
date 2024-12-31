import { Players } from "@prisma/client";
import { Button } from "./ui/button";
import { positionColors } from "../_constants/position-colors";
import Link from "next/link";

interface PlayerProps {
  player: Players;
}

const Player = ({ player }: PlayerProps) => {
  return (
    <Button
      className="flex justify-between border border-[#515255] text-base p-2 font-semibold rounded-xl bg-transparent shadow shadow-slate-500"
      asChild
    >
      <Link href={`/player/${player.id}`}>
        <p className="capitalize">
          {player.name} ({player.playerOwner})
        </p>
        <p
          className={`uppercase border-b-2 ${
            positionColors[player.mainPosition]
          }`}
        >
          {player.mainPosition}
        </p>
      </Link>
    </Button>
  );
};

export default Player;
