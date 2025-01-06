"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Settings } from "lucide-react";
import Link from "next/link";

interface SearchPlayerProps {
  isLoading?: boolean;
}

const SearchPlayer = ({ isLoading }: SearchPlayerProps) => {
  const router = useRouter();

  const [query, setQuery] = useState<string>("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query || query.trim() === "") return;

    router.push(`/search/players?search=${query.trim()}`);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearchSubmit}>
        <div className="flex gap-3">
          <Input
            className="w-[220px] focus:border-2 border-[#515255] sm:w-[300px] focus:shadow-md focus:shadow-[#515255]"
            onChange={handleSearch}
            placeholder="Digite o nome do jogador.."
            value={query}
          />
          <Button
            variant="default"
            disabled={isLoading}
            className="font-bold flex items-center justify-center gap-2 px-4 py-2 bg-[#495057] text-white rounded-md hover:bg-[#343a40] focus:ring-2 focus:ring-gray-500 focus:outline-none disabled:bg-gray-500"
          >
            Buscar <Search />
          </Button>
        </div>
      </form>

      <Button
        variant="default"
        disabled={isLoading}
        className="font-bold flex items-center justify-center gap-2 px-4 py-2 bg-[#495057] text-white rounded-md hover:bg-[#343a40] focus:ring-2 focus:ring-gray-500 
        focus:outline-none disabled:bg-gray-500 w-full"
        asChild
      >
        <Link href="/search/advanced-search">
          <span>Busca Avançada</span> <Settings />
        </Link>
      </Button>
    </div>
  );
};

export default SearchPlayer;
