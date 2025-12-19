import Image from "next/image";
import loader from "@/public/loader-arena-pes.png";

const Loader = () => {
  return (
    <div className="absolute left-0 top-0 z-[100] h-screen w-screen">
      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
        <div className="relative h-[250px] md:h-[350px] w-[95%] md:w-[80%] self-center lg:w-[65%] xl:w-[50%] 2xl:w-[35%] animate-pulse">
          <Image
            src={loader}
            alt="loader arena pes"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
