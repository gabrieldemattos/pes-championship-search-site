import { cn } from "@/app/_lib/utils";

interface StatusProps {
  status: string;
  value: string | number;
  className?: string;
}

const Status = ({ status, value, className }: StatusProps) => {
  return (
    <p className="border-b py-1 px-2 text-sm">
      {status} <span className={cn("font-semibold", className)}>{value}</span>
    </p>
  );
};

export default Status;
