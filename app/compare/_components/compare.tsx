import { Card } from "@/app/_components/ui/card";
import { status } from "@/app/_constants/status";
import { Players } from "@prisma/client";
import StatValue from "./stat-value";
import { lineupPositionColors } from "@/app/_constants/position-colors";

interface CompareProps {
  playerA: Players;
  playerB: Players;
}

const Compare = ({ playerA, playerB }: CompareProps) => {
  return (
    <div className="bg-[#1a1d29]">
      {/* Header */}
      <div className="rounded-b-lg w-full max-w-4xl mx-auto sticky top-0 z-50 grid grid-cols-[1fr,auto,1fr] gap-2 sm:gap-4 p-3 sm:p-5 bg-gradient-to-br from-[#2b2f3e] via-[#2b2f3e] to-[#232633] border-b border-[#3d424f]">
        <div className="flex items-center justify-between">
          <div className="text-start space-y-1">
            <h2 className="text-base sm:text-xl font-bold text-white">
              {playerA.name}
            </h2>

            <p className="text-sm sm:text-base text-gray-400 leading-tight">
              ({playerA.playerOwner})
            </p>
          </div>

          <p
            className={`border-b-[3px] text-[.6875rem] sm:text-base px-3 py-1 shrink-0 font-bold rounded-lg ${
              lineupPositionColors[playerA.mainPosition]
            }`}
          >
            {playerA.mainPosition}
          </p>
        </div>

        <div className="w-px bg-[#3d424f] self-stretch" />

        <div className="flex items-center justify-between">
          <div className="text-start space-y-1">
            <h2 className="text-base sm:text-xl font-bold text-white">
              {playerB.name}
            </h2>

            <p className="text-sm sm:text-base text-gray-400 leading-tight">
              ({playerB.playerOwner})
            </p>
          </div>

          <p
            className={`border-b-[3px] text-[.6875rem] sm:text-base px-3 py-1 shrink-0 font-bold rounded-lg ${
              lineupPositionColors[playerB.mainPosition]
            }`}
          >
            {playerB.mainPosition}
          </p>
        </div>
      </div>

      <div className="min-h-screen bg-[#1a1d29] flex items-center justify-center p-2 sm:p-4 pt-5 pb-20">
        <Card className="w-full max-w-3xl bg-[#2b2f3e] border-[#3d424f] shadow-2xl overflow-hidden">
          {/* Status */}
          <div className="p-3 sm:p-6">
            <div className="space-y-2 sm:space-y-4">
              {status.map((stat) => {
                const aValue = playerA[stat.status as keyof Players];
                const bValue = playerB[stat.status as keyof Players];

                return (
                  <div
                    key={stat.status}
                    className="grid grid-cols-[1fr,auto,1fr] gap-2 sm:gap-4 items-center bg-[#1a1d29]/50 rounded-lg p-2 sm:p-3 border border-[#3d424f]/30"
                  >
                    {/* Player A status */}
                    <StatValue
                      value={aValue as number}
                      win={aValue > bValue}
                      draw={aValue === bValue}
                      side="left"
                      sum={Number(aValue) - Number(bValue)}
                    />

                    {/* Status label */}
                    <div className="text-center min-w-[100px] sm:min-w-[140px]">
                      <span className="text-xs sm:text-sm lg:text-base font-medium text-white whitespace-nowrap">
                        {stat.label}
                      </span>
                    </div>

                    {/* Player B status */}
                    <StatValue
                      value={bValue as number}
                      win={bValue > aValue}
                      draw={bValue === aValue}
                      side="right"
                      sum={Number(bValue) - Number(aValue)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Compare;
