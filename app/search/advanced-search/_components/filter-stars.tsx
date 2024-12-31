interface FilterStarsProps {
  stars: string[];
  selectedStars: string[];
  toggleStar: (star: string) => void;
}

export const FilterStars = ({
  stars,
  selectedStars,
  toggleStar,
}: FilterStarsProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 mt-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {stars.map((star) => (
        <button
          key={star}
          onClick={() => toggleStar(star)}
          className={`p-2 rounded capitalize font-semibold ${
            selectedStars.includes(star)
              ? "bg-green-500 text-white"
              : "bg-gray-100 text-black"
          }`}
        >
          {star}
        </button>
      ))}
    </div>
  );
};
