import { Lineup } from "@/app/_types/Lineup";
import { Position } from "@/app/_types/Position";
import PositionSlot from "./position-slot";

const FieldRow = ({
  positions,
  lineup,
}: {
  positions: Position[];
  lineup: Lineup;
}) => {
  return (
    <div className="flex justify-center gap-4 break-all">
      {positions.map((pos) => (
        <PositionSlot key={pos} id={pos} player={lineup[pos]} />
      ))}
    </div>
  );
};

export default FieldRow;
