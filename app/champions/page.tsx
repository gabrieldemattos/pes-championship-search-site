"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { champions } from "./_actions/champions";
import { Champion } from "@prisma/client";
import { useEffect, useState } from "react";

export default function ChampionsPage() {
  const [allChampions, setAllChampions] = useState<Champion[] | null>(null);

  const fetchChampions = async () => {
    const fetchChampions = await champions();
    setAllChampions(fetchChampions.reverse());
  };

  useEffect(() => {
    fetchChampions();
  }, []);

  console.log(allChampions);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl lg:text-4xl font-bold mb-8 text-center text-blue-400">
        🏆 Últimos Campeões
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allChampions ? (
          allChampions.map((champion) => (
            <motion.div
              key={champion.id}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 hover:shadow-2xl transition-shadow"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-2xl font-bold text-white">
                  {champion.playerOwner}
                </h2>
              </div>
              <p className="text-gray-400 mb-4">{champion.season}</p>

              <div className="text-white rounded-lg py-5">
                <h2 className="text-lg font-bold text-yellow-400">
                  Resultado da Final:
                </h2>
                <p className="text-lg font-extrabold w-52">
                  {champion.finalScore}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Image
                  src={champion.highlightPlayerImage}
                  alt={`Jogador destaque: ${champion.highlightPlayerImage}`}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400">
                    Jogador Destaque:
                  </h3>
                  <p className="text-xl font-bold">
                    {champion.highlightPlayerSlug}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-blue-400">
                  Time Campeão:
                </h4>
                <motion.ul
                  className="grid grid-cols-2 gap-3 mt-3 text-sm"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.05 },
                    },
                  }}
                >
                  {champion.teamPlayersSlugs.map((player) => (
                    <motion.li
                      key={player}
                      className="bg-gray-700 p-2 rounded-md hover:bg-blue-600 transition-colors"
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 },
                      }}
                    >
                      {player}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          ))
        ) : (
          <h1 className="text-center text-2xl w-full font-bold mt-5 opacity-60 col-span-3">
            Carregando...
          </h1>
        )}
      </div>
    </main>
  );
}
