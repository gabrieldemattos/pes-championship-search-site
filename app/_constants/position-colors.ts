export const positionColors = [
  { keys: ["CF", "SS", "WF"], color: "text-red-500 border-red-500" },
  {
    keys: ["AMF", "SMF", "CMF", "WB", "DMF"],
    color: "text-green-500 border-green-500",
  },
  { keys: ["SB", "CB", "CWP", "CBT"], color: "text-blue-500 border-blue-500" },
  { keys: ["GK"], color: "text-orange-500 border-orange-500" },
].reduce<Record<string, string>>((acc, group) => {
  group.keys.forEach((key) => {
    acc[key] = group.color;
  });
  return acc;
}, {});

export const lineupPositionColors = [
  { keys: ["CF", "SS", "WF"], color: "text-red-700 border-red-700 bg-red-100" },
  {
    keys: ["AMF", "SMF", "CMF", "WB", "DMF"],
    color: "text-green-700 border-green-700 bg-green-100",
  },
  {
    keys: ["SB", "CB", "CWP", "CBT"],
    color: "text-blue-700 border-blue-700 bg-blue-100",
  },
  { keys: ["GK"], color: "text-orange-700 border-orange-700 bg-orange-200" },
].reduce<Record<string, string>>((acc, group) => {
  group.keys.forEach((key) => {
    acc[key] = group.color;
  });
  return acc;
}, {});
