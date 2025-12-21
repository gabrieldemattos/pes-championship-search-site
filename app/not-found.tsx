import Link from "next/link";
import { AlertCircle, Home } from "lucide-react";
import { Button } from "./_components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1a1d29] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FF6B35]/20 to-[#F7B801]/20 flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-[#FF6B35]" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#F7B801] rounded-full flex items-center justify-center text-[#1a1d29] font-bold text-sm">
              404
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Página não encontrada
        </h1>

        {/* Description */}
        <p className="text-gray-400 mb-8 text-sm sm:text-base">
          A página que você está procurando não existe ou foi movida para outro
          lugar.
        </p>

        {/* Action Button */}
        <Link href="/">
          <Button className="bg-gradient-to-r from-[#FF6B35] to-[#F7B801] hover:from-[#FF6B35]/90 hover:to-[#F7B801]/90 text-white font-semibold px-6 py-6 text-base">
            <Home className="w-5 h-5 mr-2" />
            Voltar para Home
          </Button>
        </Link>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-[#F7B801] animate-pulse delay-75"></div>
          <div className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse delay-150"></div>
        </div>
      </div>
    </div>
  );
}
