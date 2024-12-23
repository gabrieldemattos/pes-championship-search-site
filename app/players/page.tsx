"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "../_components/ui/button";
import { useEffect, useState } from "react";
import { Players } from "@prisma/client";
import { searchPlayers } from "./_actions/search";
import Link from "next/link";
import { positionColors } from "../_constants/position-colors";
import SearchPlayer from "../_components/search-player";
import Navbar from "../_components/navbar";
import ErrorMessage from "../_components/error-message";

const PlayersPage = () => {
  const searchParams = useSearchParams();

  const searchFor = searchParams.get("search");

  const [players, setPlayers] = useState<Players[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPlayers = async () => {
      if (!searchFor) return;

      setIsLoading(true);
      try {
        const foundplayers = await searchPlayers(searchFor);

        setPlayers(foundplayers);
        setError("");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError(
          "Ocorreu um erro ao realizar a busca, retorne para o início e tente novamente."
        );
        setPlayers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, [searchFor]);

  return (
    <div className="pb-10">
      <Navbar />

      <div className="p-5">
        <div className="mt-8">
          <SearchPlayer isLoading={isLoading} />
        </div>

        <div className="mt-10">
          <p className="text-lg">
            Resultados para:{" "}
            <span className="font-bold italic capitalize">
              {searchFor?.toLocaleLowerCase()}
            </span>
          </p>
        </div>

        <div className="mt-5">
          {isLoading ? (
            <p className="text-white text-lg">Buscando jogador...</p>
          ) : (
            <div className="space-y-3">
              {players.map((player) => (
                <Button
                  key={player.id}
                  className="flex justify-between border text-base p-2 font-semibold rounded bg-transparent"
                  asChild
                >
                  <Link href={`/players/${player.id}`}>
                    <p className="capitalize">
                      {player.name} ({player.playerOwner})
                    </p>
                    <p
                      className={`uppercase border-b-2 ${
                        positionColors[player.mainPosition]
                      }`}
                    >
                      {player.mainPosition}
                    </p>
                  </Link>
                </Button>
              ))}
            </div>
          )}

          {players.length === 0 && !isLoading && error === "" && (
            <p className="text-white text-base opacity-80 mt-10">
              Nenhum jogador encontrado com esse nome..
            </p>
          )}

          {error !== "" && !isLoading && <ErrorMessage error={error} />}
        </div>
      </div>
    </div>
  );
};

export default PlayersPage;
