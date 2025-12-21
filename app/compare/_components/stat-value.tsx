import { ArrowUp } from "lucide-react";

const StatValue = ({
  value,
  win,
  side,
  sum,
}: {
  value: number;
  win: boolean;
  side: "left" | "right";
  sum: number;
}) => {
  const valueColors = (value: number) => {
    if (value === 7) return "text-orange-500";
    if (value === 8) return "text-red-500";
    if (value >= 75 && value < 90) return "text-yellow-500";
    if (value >= 90 && value < 95) return "text-orange-500";
    if (value >= 95) return "text-red-500";
    return "text-white";
  };

  return (
    <div className="flex items-center justify-center gap-2 relative">
      {side === "left" &&
        (win ? (
          <div className="flex gap-1 items-center absolute left-0">
            <span className="text-green-500">
              <ArrowUp size={20} />
            </span>

            <span className="text-gray-400 text-xs">({sum})</span>
          </div>
        ) : (
          <span className="text-red-500 absolute left-0">
            <ArrowUp className="rotate-180" size={20} />
          </span>
        ))}

      <span
        className={`${valueColors(value)} text-sm sm:text-lg font-bold ${
          side === "left" ? "pl-8" : "pr-8"
        }`}
      >
        {value}
      </span>

      {side === "right" &&
        (win ? (
          <div className="flex gap-1 items-center absolute right-0">
            <span className="text-green-500">
              <ArrowUp size={20} />
            </span>

            <span className="text-gray-400 text-xs">({sum})</span>
          </div>
        ) : (
          <span className="text-red-500 absolute right-0">
            <ArrowUp className="rotate-180" size={20} />
          </span>
        ))}
    </div>
  );
};

export default StatValue;
