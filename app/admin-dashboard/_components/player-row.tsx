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
import { useActionState, useState } from "react";
import { editPlayer } from "../actions/edit-player";
import { participants } from "@/app/_constants/participants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { toast } from "sonner";

const orderedParticipants = participants.sort((a, b) =>
  a.name.localeCompare(b.name)
);

const participantsOptions = [
  ...orderedParticipants,
  { name: "Descarte", slug: "descarte" },
];

export const PlayerRow = ({ player }: { player: Players }) => {
  const [selected, setSelected] = useState<{
    name: string;
    slug: string;
  } | null>(null);
  const [state, formAction, isPending] = useActionState(editPlayer, null);
  const [open, setOpen] = useState(false); // controla o modal

  return (
    <div className="border rounded-2xl text-left py-2 px-4 flex justify-between items-center">
      <div>
        <span className="font-semibold text-base">{player.name}</span>
        <p className="text-base text-yellow-500">({player.playerOwner})</p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            className="bg-transparent text-white hover:bg-transparent"
            onClick={() => setOpen(true)}
          >
            <Pencil size={16} />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[90%] sm:max-w-[425px] text-black">
          <DialogHeader>
            <DialogTitle>
              Transferindo{" "}
              <span className="font-semibold uppercase text-red-500">
                {player.name}
              </span>
              <p className="my-3 font-light text-[1rem]">
                Dono atual: {player.playerOwner}
              </p>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <form
            action={async (formData: FormData) => {
              try {
                await formAction(formData);
                toast.success(
                  `Jogador atualizado para ${formData.get("owner-name")}`,
                  {
                    duration: 5000,
                    position: "bottom-center",
                  }
                );
                setOpen(false);
              } catch (err) {
                console.error(err);
                toast.error("Erro ao atualizar o jogador");
              }
            }}
          >
            <div className="space-y-8">
              <div>
                <span>ID:</span>
                <Input name="id" value={player.id} readOnly />
              </div>

              <div>
                <p>Selecione o novo dono:</p>
                <Select
                  onValueChange={(value) => setSelected(JSON.parse(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o novo dono do jogador" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>PARTICIPANTES</SelectLabel>
                      {participantsOptions.map((participant) => (
                        <SelectItem
                          key={participant.slug}
                          value={JSON.stringify(participant)}
                          className={
                            participant.slug === "descarte"
                              ? "text-red-500 uppercase bold"
                              : ""
                          }
                        >
                          {participant.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <input
                  type="hidden"
                  name="owner-name"
                  value={selected?.name ?? ""}
                />
                <input
                  type="hidden"
                  name="owner-slug"
                  value={selected?.slug ?? ""}
                />
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Salvando..." : "SALVAR"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
