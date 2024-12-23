import Link from "next/link";
import Status from "./status";

interface PlayersOwnerButtonProps {
  playerOwner: string;
  playerOwnerSlug: string;
}

const PlayerOwnerButton = ({
  playerOwner,
  playerOwnerSlug,
}: PlayersOwnerButtonProps) => {
  return (
    <Link href={`/team/${playerOwnerSlug}`}>
      <Status status="Dono:" value={playerOwner} />
    </Link>
  );
};

export default PlayerOwnerButton;
