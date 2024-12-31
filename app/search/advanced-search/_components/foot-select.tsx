import { Button } from "@/app/_components/ui/button";
import { Eraser } from "lucide-react";

interface FootSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onClearFilter: () => void;
}

export const FootSelect = ({
  label,
  value,
  onChange,
  onClearFilter,
}: FootSelectProps) => {
  return (
    <div className="border border-[#515255] p-4 shadow rounded">
      <label className="block font-bold">{label}</label>
      <div className="flex items-center gap-2 mt-2">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border rounded p-2 w-full text-black"
        >
          <option value="">-</option>
          <option value="Left">Esquerdo</option>
          <option value="Right">Direito</option>
        </select>

        <Button variant="destructive" onClick={onClearFilter}>
          <Eraser className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
