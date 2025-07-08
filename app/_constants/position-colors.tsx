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
