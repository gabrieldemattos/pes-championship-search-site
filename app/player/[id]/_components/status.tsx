import { cn } from "@/app/_lib/utils";
import { ReactNode } from "react";

interface StatusProps {
  icon?: ReactNode;
  status: string;
  value: string | number;
  className?: string;
}

const Status = ({ icon, status, value, className }: StatusProps) => {
  return (
    <div className="flex items-center border-b border-[#515255] py-2 px-2 text-sm gap-2">
      {icon}
      <p>
        {status} <span className={cn("font-semibold", className)}>{value}</span>
      </p>
    </div>
  );
};

export default Status;
