import Image from "next/image";
import SearchPlayer from "./_components/search-player";

export default function Home() {
  return (
    <div>
      <div className="w-screen text-white flex flex-col pt-28">
        <div className="relative h-[250px] md:h-[350px] w-[95%] md:w-[80%] self-center lg:w-[65%] xl:w-[50%] 2xl:w-[35%]">
          <Image
            src="/pes-logo.png"
            alt="logo pes"
            fill
            priority
            className="object-contain"
          />
        </div>

        <div className="mx-auto">
          <SearchPlayer />
        </div>
      </div>
    </div>
  );
}
