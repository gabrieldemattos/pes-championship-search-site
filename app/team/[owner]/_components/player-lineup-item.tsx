import { lineupPositionColors } from "@/app/_constants/position-colors";
import { useDraggable } from "@dnd-kit/core";
import { Players } from "@prisma/client";

const PlayerLineupItem = ({ player }: { player: Players }) => {
  const { setNodeRef, listeners, attributes } = useDraggable({
    id: player.id,
  });

  const borderColor = lineupPositionColors[player.mainPosition];

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ touchAction: "none" }}
      className={`${borderColor} border-b-8 !text-foreground min-w-[100px] px-3 py-2 rounded-xl text-center shadow cursor-grab flex items-center justify-center font-bold text-sm md:text-base`}
    >
      {player.name}
    </div>
  );
};

export default PlayerLineupItem;
