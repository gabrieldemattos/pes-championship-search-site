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

  return (
    <nav className="flex items-center justify-between p-3 shadow-md shadow-slate-500">
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
        <SheetContent className="text-black w-[300px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>

            <div className="pt-5 w-full">
              <SheetClose
                className="justify-start border py-2 px-4 rounded shadow-sm hover:bg-accent hover:text-accent-foreground"
                asChild
              >
                <Link href="/" className="flex gap-2 text-sm w-full">
                  <Home size={20} />
                  <span className="font-semibold">Início</span>
                </Link>
              </SheetClose>

              <SheetDescription></SheetDescription>

              <div className="py-4">
                <Separator />
              </div>

              <div className="space-y-3">
                {participants.map((participant) => (
                  <SheetClose
                    className="justify-start border py-2 px-4 rounded shadow-sm hover:bg-accent hover:text-accent-foreground"
                    asChild
                    key={participant.slug}
                  >
                    <Link
                      href={`/team/${participant.slug}`}
                      className="flex gap-2 text-sm w-full"
                    >
                      <Flag size={20} />
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
