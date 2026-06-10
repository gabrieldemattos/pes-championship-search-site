"use client";

import { useEffect, useMemo, useState } from "react";
import { Trophy } from "lucide-react";
import { Champion } from "@prisma/client";

import { champions } from "./_actions/champions";
import ChampionsList from "./_components/champions-list";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../_components/ui/tabs";
import { State } from "../_types/State";
import Loader from "../_components/loader";
import ErrorMessage from "../_components/error-message";

export default function ChampionsPage() {
  const [allChampions, setAllChampions] = useState<Champion[]>([]);
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        setState("loading");
        const data = await champions();

        setAllChampions([...data].reverse());
        setState("success");
      } catch {
        setState("error");
      }
    };

    fetchChampions();
  }, []);

  const { principal, copinha } = useMemo(() => {
    return {
      principal: allChampions.filter(
        (champion) => champion.category === "Principal",
      ),
      copinha: allChampions.filter(
        (champion) => champion.category === "Copinha",
      ),
    };
  }, [allChampions]);

  return (
    <main className="min-h-screen px-4 py-12 md:px-8">
      {state === "loading" && <Loader />}
      {state === "error" && (
        <ErrorMessage error="Ocorreu um erro ao carregar os campeões. Tente novamente mais tarde." />
      )}

      {state === "success" && (
        <div className="mx-auto flex max-w-6xl flex-col gap-10">
          <header className="flex items-center justify-center gap-3">
            <Trophy className="size-9 text-amber-400" aria-hidden="true" />

            <h1 className="text-3xl font-bold tracking-tight text-blue-500">
              Últimos Campeões
            </h1>
          </header>

          <Tabs
            defaultValue="principal"
            className="w-full flex flex-col items-center gap-2"
          >
            <TabsList className="h-11 bg-slate-800">
              <TabsTrigger
                value="principal"
                className="px-6 text-base text-slate-300 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                Principal
              </TabsTrigger>

              <TabsTrigger
                value="copinha"
                className="px-6 text-base text-slate-300 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                Copinha
              </TabsTrigger>
            </TabsList>

            <TabsContent value="principal" className="w-full">
              <ChampionsList champions={principal} />
            </TabsContent>

            <TabsContent value="copinha" className="w-full">
              <ChampionsList champions={copinha} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </main>
  );
}
