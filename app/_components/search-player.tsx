"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

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

    router.push(`/players?search=${query.trim()}`);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <div className="flex gap-3">
        <Input
          className="w-[300px] focus:border-2"
          onChange={handleSearch}
          placeholder="Digite o nome do jogador.."
          value={query}
        />
        <Button variant="secondary" disabled={isLoading}>
          Buscar <Search />
        </Button>
      </div>
    </form>
  );
};

export default SearchPlayer;
