import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="absolute left-0 top-0 z-[100] h-screen w-screen">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Loader2 className="animate-spin" size={100} />
        <span className="text-2xl font-bold">Carregando..</span>
      </div>
    </div>
  );
};

export default Loader;
