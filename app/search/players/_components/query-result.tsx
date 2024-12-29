import ErrorMessage from "@/app/_components/error-message";
import SearchPlayer from "@/app/_components/search-player";
import { Button } from "@/app/_components/ui/button";
import { positionColors } from "@/app/_constants/position-colors";
import { Players } from "@prisma/client";
import Link from "next/link";

interface PlayersProps {
  players: Players[];
  isLoading: boolean;
  searchFor: string;
  error: string;
}

const QueryResult = ({
  players,
  isLoading,
  searchFor,
  error,
}: PlayersProps) => {
  return (
    <div className="pb-10 p-5 md:px-32 lg:px-60 xl:px-96">
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
          <div className="space-y-3 2xl:grid 2xl:grid-cols-2 items-center 2xl:space-y-0 2xl:gap-4">
            {players.map((player) => (
              <Button
                key={player.id}
                className="flex justify-between border border-[#515255] text-base p-2 font-semibold rounded-xl bg-transparent shadow shadow-slate-500"
                asChild
              >
                <Link href={`/player/${player.id}`}>
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
  );
};

export default QueryResult;
