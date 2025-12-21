"use client";

import PlayerAccordingToPosition from "./_components/player-according-to-position";
import { useEffect, useState } from "react";
import { Players } from "@prisma/client";
import { searchTeam } from "./_actions/search-team";
import Loader from "@/app/_components/loader";
import { ClipboardList, Columns, Grid2X2Icon } from "lucide-react";
import ErrorMessage from "@/app/_components/error-message";
import LineupBuilder from "./_components/lineup-builder";
import { Button } from "@/app/_components/ui/button";
import CompareModal from "./_components/compare-modal";
import { State } from "@/app/_types/State";

const TeamPage = ({ params }: { params: Promise<{ owner: string }> }) => {
  const [playersList, setPlayersList] = useState<Players[]>([]);
  const [state, setState] = useState<State>("idle");
  const [isGrid, setIsGrid] = useState<boolean>(true);
  const [step, setStep] = useState<number>(0);
  const [openCompareModal, setOpenCompareModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      if (!params) return;

      setState("loading");
      try {
        const players = await searchTeam((await params).owner);

        setPlayersList(players);
        setState("success");
      } catch {
        setState("error");
        setPlayersList([]);
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
    ...playersList.filter((player) => attackers.includes(player.mainPosition)),
    ...playersList.filter((player) =>
      midfielders.includes(player.mainPosition)
    ),
    ...playersList.filter((player) => defenders.includes(player.mainPosition)),
    ...playersList.filter((player) =>
      goalkeepers.includes(player.mainPosition)
    ),
  ];

  return (
    <div className="pb-5 md:px-10 lg:px-32 xl:px-60 2xl:px-96">
      {state === "loading" && <Loader />}

      {state === "error" && (
        <div className="px-5">
          <ErrorMessage error="Ocorreu um erro ao realizar a busca, retorne para o início e tente novamente." />
        </div>
      )}

      {state === "success" && playersList.length > 0 && step === 0 && (
        <>
          <h1 className="text-center text-lg mt-7 sm:text-xl">
            Você está visualizando o time de{" "}
            <span className="font-bold">{playersList[0].playerOwner}</span>
          </h1>

          <div
            data-grid={isGrid}
            className="py-2 px-5 lg:max-w-[70%] lg:mx-auto mt-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <Button
                variant="secondary"
                onClick={() => setOpenCompareModal(true)}
              >
                Comparar jogador
              </Button>

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
            </div>

            <div
              data-grid={isGrid}
              className="flex flex-col rounded-lg gap-2 data-[grid=true]:grid data-[grid=true]:grid-cols-2 data-[grid=true]:border-none"
            >
              <PlayerAccordingToPosition
                position="Ataque"
                playerPositions={attackers}
                players={playersList}
                className="border-red-700"
              />

              <PlayerAccordingToPosition
                position="Meio-Campo"
                playerPositions={midfielders}
                players={playersList}
                className="border-green-700"
              />

              <PlayerAccordingToPosition
                position="Defesa"
                playerPositions={defenders}
                players={playersList}
                className="border-blue-700"
              />

              <PlayerAccordingToPosition
                position="Goleiro"
                playerPositions={goalkeepers}
                players={playersList}
                className="border-yellow-700"
              />
            </div>
          </div>

          <CompareModal
            open={openCompareModal}
            setOpen={setOpenCompareModal}
            playersList={sortedPlayersList}
            team={playersList[0].playerOwner}
          />
        </>
      )}

      {state === "loading" && playersList.length > 0 && step === 1 && (
        <LineupBuilder playersList={sortedPlayersList} setStep={setStep} />
      )}
    </div>
  );
};

export default TeamPage;
