import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liga | Arena PES 2008",
  description: "Classificação e tabela da liga Arena PES 2008.",
};

const LigaPage = () => {
  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 56px)" }}>
      <iframe
        src="https://copafacil.com/-1pzjn"
        className="w-full flex-1 border-0"
        title="Liga - Arena PES 2008"
        allow="fullscreen"
        loading="lazy"
      />
    </div>
  );
};

export default LigaPage;
