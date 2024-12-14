import Image from "next/image";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";

export default function Home() {
  return (
    <div className="bg-black w-screen h-screen text-white flex flex-col pt-3">
      <div className="relative h-[250px] w-full">
        <Image
          src="/pes-logo.png"
          alt="logo pro evolution soccer 2007"
          fill
          className="object-contain"
        />
      </div>

      <div className="flex flex-col gap-2 w-fit mx-auto mt-16">
        <p className="text-xl">Nome do jogador:</p>

        <div className="flex gap-3">
          <Input className="w-[300px]" />
          <Button variant="secondary">Buscar</Button>
        </div>
      </div>
    </div>
  );
}
