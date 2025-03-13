import Image from "next/image";
import SearchPlayer from "./_components/search-player";

export default function Home() {
  return (
    <div>
      <div className="w-screen text-white flex flex-col pt-28">
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
