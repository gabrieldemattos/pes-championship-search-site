"use client";

import { useRouter } from "next/navigation";
import { PlayerNotFound } from "./player-not-found";

export default function CompareError() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#1a1d29] flex items-center justify-center p-4">
      <PlayerNotFound
        message="Algum jogador não foi encontrado. Verifique os parâmetros e tente novamente."
        onRetry={() => router.back()}
      />
    </div>
  );
}
