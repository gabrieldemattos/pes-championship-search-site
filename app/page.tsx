import Image from "next/image";
import SearchPlayer from "./_components/search-player";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="h-[200px] w-full animate-swingDown z-10 relative">
        <Link href="/regulation">
          <Image
            src="/regulation-plate.png"
            alt="regulation plate"
            fill
            priority
            className="object-contain"
          />
        </Link>
      </div>

      <div className="w-screen text-white flex flex-col relative pt-3 top-0 left-0 translate-y-[0%] md:translate-y-[10%] lg:translate-y-[5%]">
        <div className="relative h-[250px] w-full md:h-[350px]">
          <Image
            src="/pes-logo.png"
            alt="logo pro evolution soccer 2007"
            fill
            priority
            className="object-contain"
          />
        </div>

        <div className="flex flex-col gap-2 w-fit mx-auto mt-16">
          <SearchPlayer />
        </div>
      </div>
    </div>
  );
}
