import React from "react";
import Settings from "./_components/settings";
import Rules from "./_components/rules";

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

      <div className="my-8 bg-[#343a40] rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-300 mb-6">⚠️ Regras</h2>
        <ul className="space-y-4">
          <Rules rule="1- Os jogos acontecerão todas as terças-feiras." />
          <Rules rule="2- Em caso de feriado ou chuva forte, não haverá jogos no dia." />
          <Rules rule="3- Os participantes poderão adiantar seus jogos da rodada seguinte." />
          <Rules rule="4- TODOS os parentes deverão jogar um contra o outro nas primeiras rodadas." />
          <Rules rule="5- Os jogadores deverão avisar com antecedência que farão substituições e as substituições deverão ocorrer SOMENTE em 3 paradas, 2 durante o jogo e 1 no intervalo" />
          <Rules rule="6- Proibido passar informações para os próximos jogadores." />
          <Rules rule="7- Proibido atrapalhar ou distrair os jogadores durante o jogo." />
          <Rules rule="8- O jogador ficará suspenso se acumular 3 cartões amarelos ou tomar 1 vermelho." />
          <Rules rule="9- Na fase de mata-mata, os cartões serão zerados, contando somente cartões vermelhos." />
          <Rules rule="10- Teremos somente 1 turno, classificando diretamente os 6 melhores para o mata-mata." />
          <Rules rule="11- Ao término do campeonato, as negociações serão reabertas." />
        </ul>
      </div>

      <h2 className="text-2xl font-semibold text-center my-10 underline">
        Formato do Mata-Mata e Repescagem
      </h2>

      <p className="text-red-500 text-center text-xl">
        Em breve, alguns ajustes serão discutidos na terça-feira.
      </p>

      {/* <div className="space-y-4">
        <p>
          - Do 7º colocado ao 14º colocado, disputarão a repescagem para se
          juntar aos 6 melhores.
        </p>
        <p>
          - Os 8 classificados disputarão um mata-mata em 2 chaves de 4
          participantes, com sorteio das chaves.
        </p>
        <p>
          - Os 2 classificados da repescagem se juntam aos 6 melhores para o
          mata-mata, com novo sorteio para definir os confrontos.
        </p>
        <p>
          - Serão 2 jogos, com vantagem de empate para o melhor classificado,
          sem penalidades em caso de empate na soma dos resultados.
        </p>
        <p>
          - A final será disputada em 2 jogos. Caso a soma do placar finalize
          empatado, haverá um terceiro jogo para definir o grande campeão.
        </p>
      </div> */}
    </div>
  );
};

export default Regulation;
