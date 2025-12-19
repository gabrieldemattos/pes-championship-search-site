import { Players } from "@prisma/client";
import { Position } from "./Position";

export type Lineup = Partial<Record<Position, Players>>;
