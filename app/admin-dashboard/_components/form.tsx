"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { useActionState } from "react";
import { searchPlayers } from "../actions/search-player";
import PlayersResults from "./players-results";

const Form = () => {
  const [result, handleSubmit, isLoading] = useActionState(searchPlayers, []);

  return (
    <div className="flex flex-col w-full px-10">
      <form
        action={handleSubmit}
        className="w-full flex items-center justify-center gap-3"
      >
        <Input
          disabled={isLoading}
          name="search"
          placeholder="Busque pelo jogador.."
        />

        <Button disabled={isLoading} type="submit" variant="secondary">
          Buscar
        </Button>
      </form>

      <div className="mt-10">
        <PlayersResults players={result} />
      </div>
    </div>
  );
};

export default Form;
