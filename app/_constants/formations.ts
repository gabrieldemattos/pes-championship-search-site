import { Position } from "../_types/Position";

export const FORMATIONS: Record<
  string,
  {
    attack: Position[];
    midfield: Position[];
    defense: Position[];
    goalkeeper: Position[];
  }
> = {
  "4-5-1": {
    attack: ["CF(1)"],
    midfield: ["LMF(1)", "AMF(1)", "DMF(1)", "AMF(2)", "RMF(1)"],
    defense: ["LB", "CB(1)", "CB(2)", "RB"],
    goalkeeper: ["GK"],
  },
  "4-4-2": {
    attack: ["CF(1)"],
    midfield: ["LMF(1)", "AMF(1)", "DMF(1)", "RMF(1)"],
    defense: ["LB", "CB(1)", "CB(2)", "RB"],
    goalkeeper: ["GK"],
  },
  "4-3-3": {
    attack: ["LWF(1)", "CF(1)", "RWF(1)"],
    midfield: ["LMF(1)", "DMF(1)", "RMF(1)"],
    defense: ["LB", "CB(1)", "CB(2)", "RB"],
    goalkeeper: ["GK"],
  },
  "3-6-1": {
    attack: ["CF(1)"],
    midfield: ["LMF(1)", "AMF(1)", "CMF(1)", "DMF(1)", "AMF(2)", "RMF(1)"],
    defense: ["CB(1)", "CB(2)", "CB(3)"],
    goalkeeper: ["GK"],
  },
  "3-5-2": {
    attack: ["CF(1)", "CF(2)"],
    midfield: ["LMF(1)", "AMF(1)", "DMF(1)", "AMF(2)", "RMF(1)"],
    defense: ["CB(1)", "CB(2)", "CB(3)"],
    goalkeeper: ["GK"],
  },
  "3-4-3": {
    attack: ["LWF(1)", "CF(1)", "RWF(1)"],
    midfield: ["LMF(1)", "AMF(1)", "DMF(1)", "RMF(1)"],
    defense: ["CB(1)", "CB(2)", "CB(3)"],
    goalkeeper: ["GK"],
  },
  "5-4-1": {
    attack: ["CF(1)"],
    midfield: ["LMF(1)", "AMF(1)", "DMF(1)", "RMF(1)"],
    defense: ["LB", "CB(1)", "CB(2)", "CB(3)", "RB"],
    goalkeeper: ["GK"],
  },
  "5-3-2": {
    attack: ["CF(1)", "CF(2)"],
    midfield: ["LMF(1)", "DMF(1)", "RMF(1)"],
    defense: ["LB", "CB(1)", "CB(2)", "CB(3)", "RB"],
    goalkeeper: ["GK"],
  },
};
