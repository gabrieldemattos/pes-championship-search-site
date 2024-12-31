interface FilterPositionsProps {
  positions: string[];
  togglePosition: (position: string) => void;
  allPositions: string[];
}

export const FilterPositions = ({
  positions,
  togglePosition,
  allPositions,
}: FilterPositionsProps) => {
  return (
    <div className="grid grid-cols-4 gap-3 mt-4 xl:grid-cols-12 lg:grid-cols-8 md:grid-cols-6">
      {allPositions.map((position) => (
        <button
          key={position}
          onClick={() => togglePosition(position)}
          className={`p-2 rounded ${
            positions.includes(position)
              ? "bg-blue-500 text-white font-bold"
              : "bg-gray-100 text-black"
          }`}
        >
          {position}
        </button>
      ))}
    </div>
  );
};
