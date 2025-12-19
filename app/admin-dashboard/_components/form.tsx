"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { useState, useTransition } from "react";
import { searchPlayers } from "../actions/search-player";
import PlayersResults from "./players-results";
import { Players } from "@prisma/client";

const Form = () => {
  const [result, setResult] = useState<Players[]>([]);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await searchPlayers(formData);
      setResult(res);
    });
  }

  return (
    <div className="flex flex-col w-full px-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(new FormData(e.currentTarget));
        }}
        className="w-full flex items-center justify-center gap-3"
      >
        <Input
          disabled={isPending}
          name="search"
          placeholder="Busque pelo jogador.."
        />

        <Button disabled={isPending} type="submit" variant="secondary">
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
