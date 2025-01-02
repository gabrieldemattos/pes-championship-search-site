"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { Players } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useActionState } from "react";
import { editPlayer } from "../actions/edit-player";

interface PlayersResultsProps {
  players: Players[];
}

const PlayersResults = ({ players }: PlayersResultsProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [results, handleSubmit, isLoading] = useActionState(editPlayer, null);

  return (
    <div className="space-y-4">
      {players.map((player) => (
        <div
          key={player.id}
          className="border rounded-2xl text-left py-2 px-4 flex justify-between items-center"
        >
          <div>
            <span className="font-semibold text-base">{player.name}</span>
            <p className="text-base text-yellow-500">({player.playerOwner})</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="bg-transparent text-white hover:bg-transparent"
              >
                <Pencil size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[90%] sm:max-w-[425px] text-black">
              <DialogHeader>
                <DialogTitle>
                  Editar{" "}
                  <span className="font-semibold uppercase text-red-500">
                    {player.name}
                  </span>
                </DialogTitle>
                <DialogDescription>
                  Lembre-se de preencher ambos os campos
                </DialogDescription>
              </DialogHeader>
              <form action={handleSubmit}>
                <div className="space-y-8">
                  <div>
                    <span>ID:</span>
                    <Input name="id" value={player.id} readOnly />
                  </div>

                  <div>
                    <p>NOME do novo dono:</p>
                    <Input
                      name="owner-name"
                      placeholder="Novo dono do jogador"
                      className="mt-1"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <p>SLUG do novo dono:</p>
                    <Input
                      name="owner-slug"
                      placeholder="Slug-do-novo-dono-do-jogador"
                      className="mt-1 lowercase"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <DialogFooter className="mt-6">
                  <Button disabled={isLoading} type="submit">
                    SALVAR
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  );
};

export default PlayersResults;
