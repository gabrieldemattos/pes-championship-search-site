import { cn } from "@/app/_lib/utils";

interface HabilityProps {
  hability: string;
  value: number;
  conditionAndWeek?: string;
}

const Hability = ({ hability, value, conditionAndWeek }: HabilityProps) => {
  const valueColor = () => {
    if (value >= 75 && value < 90) return "text-yellow-500";
    if (value >= 90 && value < 95) return "text-orange-500";
    if (value >= 95) return "text-red-500";
    return;
  };

  return (
    <p className="text-lg flex items-center justify-between capitalize">
      {hability}{" "}
      <span className={cn(`${valueColor()} font-semibold`, conditionAndWeek)}>
        {value}
      </span>
    </p>
  );
};

export default Hability;
