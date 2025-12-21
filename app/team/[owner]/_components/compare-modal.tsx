import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Label } from "@/app/_components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { participants } from "@/app/_constants/participants";
import { useTeamPlayers } from "@/app/_hooks/useTeamPlayers";
import { Players } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

interface CompareModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  playersList: Players[];
  team: string;
}

interface CompareModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  playersList: Players[];
  team: string;
}

const CompareModal = ({
  open,
  setOpen,
  playersList,
  team,
}: CompareModalProps) => {
  const router = useRouter();

  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [players, setPlayers] = useState<{
    firstPlayer: string | null;
    secondPlayer: string | null;
  }>({
    firstPlayer: null,
    secondPlayer: null,
  });

  const { playersList: playersToCompare, state } = useTeamPlayers(selectedTeam);

  const handleSelectTeam = (team: string) => setSelectedTeam(team);
  const handleFirstPlayer = (id: string) =>
    setPlayers((prev) => ({ ...prev, firstPlayer: id }));
  const handleSecondPlayer = (id: string) =>
    setPlayers((prev) => ({ ...prev, secondPlayer: id }));

  const handleCompareClick = () =>
    router.push(`/compare/${players.firstPlayer}?with=${players.secondPlayer}`);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogContent className="w-[95%] sm:max-w-[425px] text-black">
          <DialogHeader>
            <DialogTitle>Comparar Jogador</DialogTitle>
            <DialogDescription>
              Escolha os jogadores para comparação
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid gap-3">
              <Label htmlFor="player-1">Jogadores do {team}</Label>

              <Select
                value={players.firstPlayer || ""}
                onValueChange={handleFirstPlayer}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="py-4">
                    {playersList.map((player) => (
                      <SelectItem key={player.id} value={player.id}>
                        {player.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="team">Selecionar time para comparar</Label>

              <Select value={selectedTeam} onValueChange={handleSelectTeam}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="py-4">
                    {participants.map((participant) => (
                      <SelectItem
                        key={participant.name}
                        value={participant.name}
                      >
                        {participant.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="player-2"
                className={`flex items-center gap-3${
                  playersToCompare.length === 0 ? "text-red-500" : ""
                }`}
              >
                Jogadores do {selectedTeam || "??"}{" "}
                {state === "loading" && <Loader2 className="animate-spin" />}
              </Label>

              <Select
                value={players.secondPlayer || ""}
                onValueChange={handleSecondPlayer}
                disabled={state === "loading" || playersToCompare.length === 0}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="py-4">
                    {playersToCompare.map((player) => (
                      <SelectItem key={player.id} value={player.id}>
                        {player.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="mt-2 gap-2">
            <DialogClose asChild>
              <Button variant="destructive">Cancelar</Button>
            </DialogClose>

            <Button
              disabled={
                state === "loading" ||
                !players.secondPlayer ||
                !players.firstPlayer
              }
              type="submit"
              onClick={handleCompareClick}
            >
              Comparar
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CompareModal;
