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

  const [search, setSearch] = useState<string>("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search) return;

    router.push(`/players?search=${search}`);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <div className="flex gap-3">
        <Input
          className="w-[300px] focus:border-2"
          onChange={handleSearch}
          placeholder="Digite o nome do jogador.."
          value={search}
        />
        <Button variant="secondary" disabled={isLoading}>
          Buscar <Search />
        </Button>
      </div>
    </form>
  );
};

export default SearchPlayer;
