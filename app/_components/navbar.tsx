"use client";

import { Button } from "./ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const backToPreviousPage = () => {
    router.back();
  };
  return (
    <div className="flex items-center justify-between p-3 shadow-md shadow-slate-500">
      <Button onClick={backToPreviousPage} variant="ghost">
        <ArrowLeft size={20} />
        <span className="font-semibold">Voltar</span>
      </Button>

      <Button variant="ghost" asChild>
        <Link href="/" className="flex gap-2 items-center text-sm">
          <Home size={20} />
          <span className="font-semibold">Início</span>
        </Link>
      </Button>
    </div>
  );
};

export default Navbar;
