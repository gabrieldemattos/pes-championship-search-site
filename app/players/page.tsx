"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Players } from "@prisma/client";
import { searchPlayers } from "./_actions/search";
import QueryResult from "./_components/query-result";

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

  if (!searchFor) return;

  return (
    <Suspense>
      <QueryResult
        players={players}
        isLoading={isLoading}
        searchFor={searchFor}
        error={error}
      />
    </Suspense>
  );
};

export default PlayersPage;
