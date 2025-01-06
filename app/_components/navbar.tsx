"use client";

import { Button } from "./ui/button";
import { ArrowLeft, Flag, Home, MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { participants } from "../_constants/participants";
import { Separator } from "./ui/separator";

const Navbar = () => {
  const router = useRouter();
  const pathName = usePathname();

  const backToPreviousPage = () => {
    router.back();
  };

  const checkIfIsHome = () => {
    if (pathName === "/") {
      return true;
    }
    return false;
  };

  const orderedParticipants = participants.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <nav className="flex items-center justify-between p-3 shadow-md shadow-slate-500 bg-[#212529] z-20">
      <Button
        onClick={backToPreviousPage}
        variant="ghost"
        disabled={checkIfIsHome()}
      >
        <ArrowLeft size={20} />
        <span className="font-semibold">Voltar</span>
      </Button>

      <Sheet>
        <SheetTrigger>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent className="text-white w-[300px] overflow-y-auto bg-[#141518] p-0 border-none">
          <SheetHeader>
            <SheetTitle className="text-left text-white px-5 pt-4 text-xl">
              Menu
            </SheetTitle>

            <div className="py-2">
              <Separator />
            </div>

            <div className="pt-5 w-full px-4">
              <SheetClose asChild>
                <Link
                  href="/"
                  className="flex gap-2 text-sm w-full bg-[#26272B] hover:bg-[#1E1F22] transition-all justify-start py-2 px-4 rounded-xl items-center shadow-sm"
                >
                  <Home size={16} />
                  <span className="font-bold">Início</span>
                </Link>
              </SheetClose>

              <SheetDescription></SheetDescription>

              <div className="py-5">
                <Separator />
              </div>

              <div className="space-y-3 pb-4">
                {orderedParticipants.map((participant) => (
                  <SheetClose asChild key={participant.slug}>
                    <Link
                      href={`/team/${participant.slug}`}
                      className="flex gap-2 text-sm w-full border border-[#26272B] hover:bg-[#26272B] transition-all justify-start py-2 px-4 rounded-xl items-center shadow-sm"
                    >
                      <Flag size={16} />
                      <span className="font-semibold">{participant.name}</span>
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
