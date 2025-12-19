"use client";

import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { Players } from "@prisma/client";
import { useState } from "react";
import FormationSelector from "./formation-selector";
import Field from "./field";
import PlayersLineupList from "./players-lineup-list";
import { Lineup } from "@/app/_types/Lineup";
import { Position } from "@/app/_types/Position";
import { ArrowLeft } from "lucide-react";

export default function LineupBuilder({
  playersList,
  setStep,
}: {
  playersList: Players[];
  setStep: (step: number) => void;
}) {
  const [formation, setFormation] = useState("4-5-1");
  const [lineup, setLineup] = useState<Lineup>({});
  const [availablePlayers, setAvailablePlayers] =
    useState<Players[]>(playersList);
  const [activePlayer, setActivePlayer] = useState<Players | null>(null);

  const ALL_PLAYERS = playersList;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActivePlayer(null);
    if (!over) return;

    const position = over.id as Position;
    const draggedPlayer = ALL_PLAYERS.find((p) => p.id === active.id);
    if (!draggedPlayer) return;

    setLineup((prev) => {
      const updated = {
        ...prev,
        [position]: draggedPlayer,
      };

      // 🔥 recalcula os disponíveis com base no campo
      const usedIds = new Set(
        Object.values(updated)
          .filter(Boolean)
          .map((p) => p!.id)
      );

      setAvailablePlayers(ALL_PLAYERS.filter((p) => !usedIds.has(p.id)));

      return updated;
    });
  };

  const handleFormationChange = (newFormation: string) => {
    setFormation(newFormation);

    // 🔥 reset TOTAL
    setLineup({});
    setAvailablePlayers(ALL_PLAYERS);
  };

  return (
    <DndContext
      onDragStart={(e) => {
        const p = availablePlayers.find((p) => p.id === e.active.id);
        setActivePlayer(p ?? null);
      }}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActivePlayer(null)}
    >
      <div className="flex flex-col h-screen p-4 gap-4">
        <div className="relative justify-center flex w-full my-2">
          <button className="absolute top-0 left-0" onClick={() => setStep(0)}>
            <ArrowLeft size={24} />
          </button>

          <h1 className="text-center text-xl font-bold">Escale seu time</h1>
        </div>
        <FormationSelector value={formation} onChange={handleFormationChange} />

        <Field formation={formation} lineup={lineup} />

        <PlayersLineupList players={availablePlayers} />

        <DragOverlay>
          {activePlayer && (
            <div className="px-4 py-2 bg-slate-700 text-white rounded-xl shadow-lg">
              {activePlayer.name}
            </div>
          )}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
