import { Players } from "@prisma/client";
import { useEffect, useState } from "react";
import { State } from "../_types/State";
import { searchTeam } from "../team/[owner]/_actions/search-team";

export const useTeamPlayers = (team: string) => {
  const [playersList, setPlayersList] = useState<Players[]>([]);
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    const fetchPlayers = async () => {
      if (!team) return;

      setState("loading");
      try {
        const players = await searchTeam(team);

        setPlayersList(players);
        setState("success");
      } catch {
        setState("error");
        setPlayersList([]);
      }
    };

    fetchPlayers();
  }, [team]);

  return { playersList, state };
};
