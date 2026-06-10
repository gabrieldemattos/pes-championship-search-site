import { Champion } from "@prisma/client";
import React from "react";
import ChampionCard from "./champion-card";

const ChampionsList = ({ champions }: { champions: Champion[] }) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {champions.map((champion) => (
        <ChampionCard key={champion.id} champion={champion} />
      ))}
    </div>
  );
};

export default ChampionsList;
