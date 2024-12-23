"use client";

import Navbar from "@/app/_components/navbar";
import PlayerAccordingToPosition from "./_components/player-according-to-position";
import { useEffect, useState } from "react";
import { Players } from "@prisma/client";
import { searchTeam } from "./_actions/search-team";
import Loader from "@/app/_components/loader";
import { Columns, Grid2X2Icon } from "lucide-react";
import ErrorMessage from "@/app/_components/error-message";

const TeamPage = ({ params }: { params: Promise<{ owner: string }> }) => {
  const [teamPlayers, setTeamPlayers] = useState<Players[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isGrid, setIsGrid] = useState<boolean>(true);

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
  const defenders = ["SB", "CB", "CWP"];
  const goalkeepers = ["GK"];

  const handleClickGrid = () => {
    setIsGrid(!isGrid);
  };

  return (
    <div className="pb-5">
      <Navbar />

      {isLoading && (
        <h1 className="text-center text-xl mt-7">
          <Loader />
        </h1>
      )}

      {error && (
        <div className="px-5">
          <ErrorMessage error={error} />
        </div>
      )}

      {!isLoading && teamPlayers.length > 0 && !error && (
        <>
          <h1 className="text-center text-xl mt-7">
            Você está visualizando o time de{" "}
            <span className="font-bold">{teamPlayers[0].playerOwner}</span>
          </h1>

          <div className="px-5 mt-4 text-right mb-2">
            <button onClick={handleClickGrid}>
              {!isGrid ? <Grid2X2Icon /> : <Columns />}
            </button>
          </div>

          <div className="py-2 px-5">
            <div
              data-grid={isGrid}
              className="flex flex-col border-2 gap-2 data-[grid=true]:grid data-[grid=true]:grid-cols-2 data-[grid=true]:border-none"
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
    </div>
  );
};

export default TeamPage;
