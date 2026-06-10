import { Card } from "@/app/_components/ui/card";
import { Champion } from "@prisma/client";
import { CalendarDays, Trophy } from "lucide-react";
import React from "react";

const ChampionCard = ({ champion }: { champion: Champion }) => {
  return (
    <Card className="flex flex-col gap-5 border-slate-700 bg-slate-800 p-6 transition-colors hover:border-blue-500/50">
      <header className="flex items-center gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
          <Trophy className="size-6 text-blue-500" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold leading-tight text-white text-balance">
            {champion.player}
          </h2>
          <p className="flex items-center gap-1.5 text-sm text-slate-400">
            <CalendarDays className="size-4" aria-hidden="true" />
            {champion.season}
          </p>
        </div>
      </header>

      <div className="rounded-lg bg-slate-900/60 p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-blue-500">
          Resultado da Final
        </span>
        <p className="mt-1 text-lg font-semibold text-white text-balance">
          {champion.scoreboard}
        </p>
      </div>
    </Card>
  );
};

export default ChampionCard;
