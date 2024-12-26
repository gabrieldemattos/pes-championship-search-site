import Link from "next/link";
import { Crown } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

interface PlayersOwnerButtonProps {
  playerOwner: string;
  playerOwnerSlug: string;
}

const PlayerOwnerButton = ({
  playerOwner,
  playerOwnerSlug,
}: PlayersOwnerButtonProps) => {
  return (
    <Button
      variant="default"
      className="w-full bg-transparent justify-start px-2 border-b border-[#515255] rounded-none py-5"
      size="sm"
      asChild
    >
      <Link href={`/team/${playerOwnerSlug}`}>
        <div className="flex items-center text-sm gap-2">
          <Crown size={12} />
          <p>
            Dono: <span className="font-semibold">{playerOwner}</span>
          </p>
        </div>
      </Link>
    </Button>
  );
};

export default PlayerOwnerButton;
