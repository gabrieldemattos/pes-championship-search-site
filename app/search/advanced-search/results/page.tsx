"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchPlayers } from "../_actions/fetch-players";
import { Players } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import Loader from "@/app/_components/loader";
import Player from "@/app/_components/player";

const AdvancedSearchResults = () => {
  const [players, setPlayers] = useState<Players[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const positions = searchParams.get("positions");
  const stars = searchParams.get("stars");
  const height = searchParams.get("height");
  const foot = searchParams.get("foot");

  const status = useMemo(() => {
    return Array.from(searchParams.entries())
      .filter(
        ([key]) =>
          key !== "positions" &&
          key !== "stars" &&
          key !== "height" &&
          key !== "foot"
      )
      .reduce((acc, [key, value]) => {
        acc[key] = JSON.parse(value as string);
        return acc;
      }, {} as Record<string, { min: number; max: number }>);
  }, [searchParams]);

  useEffect(() => {
    const getPlayers = async () => {
      const footValue = Array.isArray(foot) ? foot[0] : foot;

      const filters = {
        status: status ? status : {},
        positions: positions ? (positions as string).split(",") : [],
        stars: stars ? (stars as string).split(",") : [],
        height: height ? JSON.parse(height as string) : {},
        foot: footValue || "",
      };

      setLoading(true);
      try {
        const playersData = await fetchPlayers(filters);

        setPlayers(playersData);
      } catch (error) {
        console.error("Erro ao buscar jogadores:", error);
      } finally {
        setLoading(false);
      }
    };

    if (Object.keys(status).length || positions || stars || height || foot) {
      getPlayers();
    }
  }, [status, positions, stars, height, foot]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="pb-10 p-5 md:px-32 lg:px-60 xl:px-96">
      <h1 className="mt-8">Resultados da Busca Avançada</h1>

      <div className="mt-5 space-y-3 2xl:grid 2xl:grid-cols-2 items-center 2xl:space-y-0 2xl:gap-4">
        {players && !loading && players.length > 0 ? (
          players.map((player) => (
            <div key={player.id} className="w-full">
              <Player player={player} />
            </div>
          ))
        ) : (
          <p>Nenhum jogador encontrado com esses filtros.</p>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearchResults;
