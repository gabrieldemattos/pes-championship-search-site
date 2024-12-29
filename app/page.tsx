import Image from "next/image";
import SearchPlayer from "./_components/search-player";

export default function Home() {
  return (
    <div className="w-screen text-white flex flex-col pt-3 relative top-0 left-0 translate-y-[15%]">
      <div className="relative h-[250px] w-full mt-10 md:h-[350px]">
        <Image
          src="/pes-logo.png"
          alt="logo pro evolution soccer 2007"
          fill
          className="object-contain"
        />
      </div>

      <div className="flex flex-col gap-2 w-fit mx-auto mt-16">
        <SearchPlayer />
      </div>
    </div>
  );
}
