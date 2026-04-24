import { legendsPlayers } from "../_constants/legends-players";

export const isLegendPlayer = (playerName: string) => legendsPlayers.includes(playerName.toLowerCase())