"use client";

import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { UserX, Search } from "lucide-react";

interface PlayerNotFoundProps {
  playerName?: string;
  message?: string;
  onRetry?: () => void;
}

export function PlayerNotFound({
  playerName,
  message,
  onRetry,
}: PlayerNotFoundProps) {
  const defaultMessage = playerName
    ? `O jogador "${playerName}" não foi encontrado`
    : "Jogador não foi encontrado";

  return (
    <Card className="w-full max-w-md mx-auto bg-[#2b2f3e] border-[#3d424f] shadow-xl">
      <div className="p-6 sm:p-8 text-center">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF6B35]/20 to-[#F7B801]/20 flex items-center justify-center">
            <UserX className="w-10 h-10 text-[#FF6B35]" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
          {defaultMessage}
        </h2>

        {/* Optional Custom Message */}
        {message && <p className="text-gray-400 text-sm mb-6">{message}</p>}

        {/* Description */}
        {!message && (
          <p className="text-gray-400 text-sm mb-6">
            Verifique se o nome está correto ou tente procurar outro jogador.
          </p>
        )}

        {/* Action Button */}
        {onRetry && (
          <Button
            onClick={onRetry}
            className="bg-gradient-to-r from-[#FF6B35] to-[#F7B801] hover:from-[#FF6B35]/90 hover:to-[#F7B801]/90 text-white font-semibold px-6"
          >
            <Search className="w-4 h-4 mr-2" />
            Tentar novamente
          </Button>
        )}
      </div>
    </Card>
  );
}
