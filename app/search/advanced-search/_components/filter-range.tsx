"use client";

import { Button } from "@/app/_components/ui/button";
import { Eraser } from "lucide-react";

interface FilterRangeProps {
  status: string;
  label: string;
  onRangeChange: (status: string, minOrMax: string, value: number) => void;
  onClearFilter: (status: string) => void;
  isHeight?: boolean;
  isSpecialStatus?: boolean;
}

export const FilterRange = ({
  status,
  label,
  onRangeChange,
  onClearFilter,
  isHeight = false,
  isSpecialStatus = false,
}: FilterRangeProps) => {
  const minValue = isHeight ? 160 : 1;
  const maxValue = isHeight ? 210 : 99;

  return (
    <div className="border border-[#515255] p-4 shadow rounded">
      <label className="block font-bold text-white">{label}</label>
      <div className="flex items-center gap-2 mt-2">
        <input
          type="number"
          data-status={status}
          placeholder="Min"
          min={minValue}
          max={isSpecialStatus ? 8 : maxValue}
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            const max = parseInt(target.max);
            if (parseInt(target.value) > max) target.value = max.toString();
          }}
          className="border rounded p-2 w-full text-black"
          onChange={(e) =>
            onRangeChange(status, "min", parseInt(e.target.value) || 0)
          }
        />
        <input
          type="number"
          data-status={status}
          placeholder="Max"
          min={minValue}
          max={isSpecialStatus ? 8 : maxValue}
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            const max = parseInt(target.max);
            if (parseInt(target.value) > max) target.value = max.toString();
          }}
          className="border rounded p-2 w-full text-black"
          onChange={(e) =>
            onRangeChange(status, "max", parseInt(e.target.value) || 0)
          }
        />

        <Button variant="destructive" onClick={() => onClearFilter(status)}>
          <Eraser className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
