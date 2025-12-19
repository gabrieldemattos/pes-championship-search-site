import { Position } from "@/app/_types/Position";
import { useDroppable } from "@dnd-kit/core";
import { Players } from "@prisma/client";

const PositionSlot = ({ id, player }: { id: Position; player?: Players }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  const hasPlayer = Boolean(player);

  return (
    <div
      ref={setNodeRef}
      className={`
        h-16 w-20 rounded-xl border-2
        flex items-center justify-center text-xs font-semibold
        transition text-center
        ${
          hasPlayer
            ? "bg-slate-700 text-white border-slate-700"
            : "bg-green-800/40 text-white border-white/40"
        }
        ${isOver ? "scale-105" : ""}
      `}
    >
      {player ? player.name : id}
    </div>
  );
};

export default PositionSlot;
