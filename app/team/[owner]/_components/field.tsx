import { FORMATIONS } from "@/app/_constants/formations";
import { Lineup } from "@/app/_types/Lineup";
import FieldRow from "./field-row";

const Field = ({
  formation,
  lineup,
}: {
  formation: string;
  lineup: Lineup;
}) => {
  const f = FORMATIONS[formation];

  return (
    <div className="flex-1 bg-green-700 rounded-2xl p-4 flex flex-col justify-between">
      <FieldRow positions={f.attack} lineup={lineup} />
      <FieldRow positions={f.midfield} lineup={lineup} />
      <FieldRow positions={f.defense} lineup={lineup} />
      <FieldRow positions={f.goalkeeper} lineup={lineup} />
    </div>
  );
};

export default Field;
