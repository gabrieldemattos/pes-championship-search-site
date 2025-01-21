import React from "react";
import Settings from "./_components/settings";
import Rules from "./_components/rules";
import Wrapper from "./_components/wrapper";
import Image from "next/image";

const Regulation = () => {
  return (
    <div className="mt-12 px-4 pb-24 min-h-screen lg:px-32 xl:px-60 2xl:px-96">
      <h1 className="text-4xl font-semibold text-center pb-6">
        Regulamento do Campeonato
      </h1>

      <div className="my-8 text-left p-6 border-2 rounded-xl border-gray-700 shadow-lg bg-[#343a40]">
        <h2 className="text-2xl font-bold text-gray-300 mb-4">
          Informações Gerais
        </h2>
        <Settings
          icon="🎮"
          label="Horário dos jogos"
          setting="Das 19 horas às 22 horas"
        />
        <Settings icon="🏆" label="Premiação" setting="R$140 para o campeão" />
        <Settings
          icon="⚽️"
          label="Dificuldade de jogo"
          setting="Profissional"
        />
        <Settings
          icon="🔄"
          label="Número de substituições"
          setting="5 substituições com 3 paradas"
        />
        <Settings icon="🚑" label="Lesão" setting="Desligada" />
        <Settings icon="⏱️" label="Tempo de jogo" setting="10 minutos" />
        <Settings
          icon="❔"
          label="Condição dos jogadores"
          setting="Aleatório"
        />
      </div>

      <Wrapper>
        <h2 className="text-2xl font-semibold text-gray-300 mb-6">⚠️ Regras</h2>
        <ul className="space-y-4">
          <Rules rule="1- Os jogos acontecerão todas as terças-feiras." />
          <Rules rule="2- Em caso de feriado ou chuva forte, não haverá jogos no dia." />
          <Rules rule="3- Os participantes poderão adiantar seus jogos da rodada seguinte." />
          <Rules rule="4- TODOS os parentes deverão jogar um contra o outro nas primeiras rodadas." />
          <Rules rule="5- Os jogadores deverão avisar com antecedência que farão substituições e as substituições deverão ocorrer SOMENTE em 3 paradas, 2 durante o jogo e 1 no intervalo" />
          <Rules rule="6- Proibido passar informações para os próximos jogadores." />
          <Rules rule="7- Proibido atrapalhar, distrair ou ajudar os jogadores durante o jogo." />
          <Rules rule="8- O jogador ficará suspenso se acumular 3 cartões amarelos ou tomar 1 vermelho, caso o jogador suspenso seja utilizado na próxima partida, o participante perderá a partida por 1x0 IMEDIATAMENTE." />
          <Rules rule="9- Na fase de mata-mata, os cartões serão zerados, contando somente cartões vermelhos." />
          <Rules rule="10- Teremos somente 1 turno, classificando diretamente os 6 melhores para o mata-mata." />
          <Rules rule="11- Ao término do campeonato, as negociações serão reabertas." />
        </ul>

        <p className="mt-4 font-medium italic text-red-400 text-justify leading-relaxed text-sm border-l-4 border-red-400 pl-4">
          <span className="font-bold">Atenção:</span> Outros casos poderão ser
          julgados, e pontos poderão ser retirados dos participantes, caso
          necessário.
        </p>
      </Wrapper>

      <h2 className="text-2xl font-semibold text-center my-10 underline">
        Formato do Mata-Mata e Repescagem
      </h2>

      <Wrapper>
        <ul className="space-y-4">
          <Rules rule="- Jogadores expulsos estarão automaticamente suspensos para a próxima partida. Caso um jogador suspenso seja utilizado, o participante será imediatamente desclassificado." />
          <Rules rule="- Os 6 primeiros colocados avançarão diretamente para o mata-mata, enquanto os demais disputarão a repescagem, onde somente 2 se juntarão aos 6 melhores." />
          <Rules rule="- Os quatro primeiros colocados terão a vantagem do empate até a semifinal. Ou seja, caso ocorra empate na soma dos placares ao término do segundo jogo, avançará o jogador com melhor classificação no geral." />
          <Rules rule="- Os 2 primeiros colocados enfrentarão os 2 participantes vindos da repescagem (sorteio para definir quem jogará contra o 1º e o 2º colocados, respectivamente). Os demais confrontos serão sorteados." />
          <Rules rule="- Os pontos não serão contabilizados nos jogos da repescagem e do mata-mata. Ou seja, a classificação geral será mantida ao término da fase de pontos corridos, não sendo alterada posteriormente." />
          <Rules rule="- NÃO HAVERÁ VANTAGEM DE EMPATE NA GRANDE FINAL. A grande final será disputada em jogo ÚNICO, com prorrogação e penalidades." />
        </ul>

        <div className="my-6 space-y-4">
          <div>
            <ul>
              <Rules rule="- Os confrontos da repescagem serão:" />
            </ul>
            <ul className="mt-2 space-y-1 ml-3">
              <li className="text-orange-400 font-medium">
                7º colocado x 14º colocado
              </li>
              <li className="text-orange-400 font-medium">
                8º colocado x 13º colocado
              </li>
              <li className="text-orange-400 font-medium">
                9º colocado x 12º colocado
              </li>
              <li className="text-orange-400 font-medium">
                10º colocado x 11º colocado
              </li>
            </ul>
          </div>

          <div>
            <ul>
              <Rules rule="- Os confrontos da repescagem serão realizados no seguinte formato:" />
            </ul>

            <ul className="mt-2 space-y-2 ml-3">
              <li className="text-orange-400 italic font-semibold">
                Dois jogos serão disputados.
              </li>
              <li className="text-orange-400 italic font-semibold">
                Se o primeiro jogo terminar empatado, o segundo deverá
                obrigatoriamente incluir prorrogação e penalidades.
              </li>
              <li className="text-orange-400 uppercase italic font-semibold">
                Caso haja um vencedor no primeiro jogo, o segundo será realizado
                sem prorrogação e penalidades.
              </li>
              <li className="text-orange-400 italic font-semibold">
                Se ao final do segundo jogo a soma dos resultados for um empate,
                um terceiro jogo será necessário, com prorrogação e penalidades.
              </li>
            </ul>
          </div>

          <p className="mt-4 font-medium italic text-red-400 text-justify leading-relaxed text-sm border-l-4 border-red-400 pl-4">
            <span className="font-bold">Motivo:</span> A máquina não reconhece
            que serão disputados dois jogos, portanto, não realiza a soma dos
            resultados automaticamente. Assim, não é possível aplicar
            prorrogação e penalidades no segundo jogo caso haja um vencedor no
            primeiro jogo e no segundo outro vencedor, resultando na igualdade
            da soma dos placares. Diante disso, um terceiro jogo torna-se
            indispensável.
          </p>
        </div>
      </Wrapper>

      <div className="md:flex md:flex-col md:items-center">
        <h2 className="text-2xl font-semibold text-center my-10 underline">
          Chaveamento dos confrontos (respecagem e mata-mata)
        </h2>

        <h3 className="text-xl font-semibold mb-4">Repescagem</h3>
        <div className="relative h-[350px] w-full md:w-[500px] bg-[#f0efeff1] rounded">
          <Image
            src="/repescagem.png"
            alt="chaveamento da repescagem"
            fill
            priority
            className="object-fill"
          />
        </div>

        <h3 className="text-xl font-semibold mb-4 mt-10">Mata-mata</h3>
        <div className="relative h-[400px] w-full md:w-[500px] bg-[#f0efeff1] rounded">
          <Image
            src="/mata-mata.png"
            alt="chaveamento do mata-mata"
            fill
            priority
            className="object-fill"
          />
        </div>
      </div>
    </div>
  );
};

export default Regulation;
