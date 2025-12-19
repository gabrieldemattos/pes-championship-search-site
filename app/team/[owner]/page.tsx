"use client";

import PlayerAccordingToPosition from "./_components/player-according-to-position";
import { useEffect, useState } from "react";
import { Players } from "@prisma/client";
import { searchTeam } from "./_actions/search-team";
import Loader from "@/app/_components/loader";
import { ClipboardList, Columns, Grid2X2Icon } from "lucide-react";
import ErrorMessage from "@/app/_components/error-message";
import LineupBuilder from "./_components/lineup-builder";

const TeamPage = ({ params }: { params: Promise<{ owner: string }> }) => {
  const [teamPlayers, setTeamPlayers] = useState<Players[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isGrid, setIsGrid] = useState<boolean>(true);
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const fetchPlayers = async () => {
      if (!params) return;

      setIsLoading(true);
      try {
        const players = await searchTeam((await params).owner);

        setTeamPlayers(players);
        setError("");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError(
          "Ocorreu um erro ao realizar a busca, retorne para o início e tente novamente."
        );
        setTeamPlayers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, [params]);

  const attackers = ["CF", "SS", "WF"];
  const midfielders = ["AMF", "SMF", "CMF", "WB", "DMF"];
  const defenders = ["SB", "CB", "CWP", "CBT"];
  const goalkeepers = ["GK"];

  const handleClickGrid = () => {
    setIsGrid(!isGrid);
  };

  const sortedPlayersList = [
    ...teamPlayers.filter((player) => attackers.includes(player.mainPosition)),
    ...teamPlayers.filter((player) =>
      midfielders.includes(player.mainPosition)
    ),
    ...teamPlayers.filter((player) => defenders.includes(player.mainPosition)),
    ...teamPlayers.filter((player) =>
      goalkeepers.includes(player.mainPosition)
    ),
  ];

  return (
    <div className="pb-5 md:px-10 lg:px-32 xl:px-60 2xl:px-96">
      {isLoading && <Loader />}

      {error && (
        <div className="px-5">
          <ErrorMessage error={error} />
        </div>
      )}

      {!isLoading && teamPlayers.length > 0 && !error && step === 0 && (
        <>
          <h1 className="text-center text-lg mt-7 sm:text-xl">
            Você está visualizando o time de{" "}
            <span className="font-bold">{teamPlayers[0].playerOwner}</span>
          </h1>

          <div
            data-grid={isGrid}
            className="py-2 px-5 lg:max-w-[70%] lg:mx-auto mt-4 space-y-4"
          >
            <div className="mb-2 flex items-center gap-3 justify-end">
              <button
                className="flex items-center gap-2"
                onClick={() => setStep(1)}
              >
                <ClipboardList />
              </button>

              <button onClick={handleClickGrid}>
                {!isGrid ? <Grid2X2Icon /> : <Columns />}
              </button>
            </div>

            <div
              data-grid={isGrid}
              className="flex flex-col rounded-lg gap-2 data-[grid=true]:grid data-[grid=true]:grid-cols-2 data-[grid=true]:border-none"
            >
              <PlayerAccordingToPosition
                position="Ataque"
                playerPositions={attackers}
                players={teamPlayers}
                className="border-red-700"
              />

              <PlayerAccordingToPosition
                position="Meio-Campo"
                playerPositions={midfielders}
                players={teamPlayers}
                className="border-green-700"
              />

              <PlayerAccordingToPosition
                position="Defesa"
                playerPositions={defenders}
                players={teamPlayers}
                className="border-blue-700"
              />

              <PlayerAccordingToPosition
                position="Goleiro"
                playerPositions={goalkeepers}
                players={teamPlayers}
                className="border-yellow-700"
              />
            </div>
          </div>
        </>
      )}

      {!isLoading && teamPlayers.length > 0 && !error && step === 1 && (
        <LineupBuilder playersList={sortedPlayersList} setStep={setStep} />
      )}
    </div>
  );
};

export default TeamPage;
