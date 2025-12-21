import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import { Crown, Footprints, Ruler, Star, Users } from "lucide-react";
import {
  lineupPositionColors,
  positionColors,
} from "@/app/_constants/position-colors";
import { ReactElement } from "react";
import Hability from "./_components/hability";
import { Badge } from "@/app/_components/ui/badge";
import Link from "next/link";
import {
  conditionAndWeekTextColor,
  injuryTextColor,
} from "@/app/_constants/status-color";

const PlayerPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const player = await db.players.findUnique({ where: { id: id } });

  if (!player) return notFound();

  return (
    <div className="p-5 md:px-16 lg:px-40 xl:px-80 2xl:px-96">
      <div className="mt-5 border border-[#515255] bg-[#2b2f3e] pb-1 rounded-xl">
        <div className="relative bg-gradient-to-br from-[#2b2f3e] via-[#2b2f3e] to-[#232633] p-3 sm:p-5 border-b-2 border-[#3d424f] rounded-xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF6B35]/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            {/* Player Name and Primary Position */}
            <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight flex-1 capitalize">
                {player.name}
              </h1>

              <p
                className={`text-base px-3 py-1 shrink-0 font-bold rounded-lg ${
                  lineupPositionColors[player.mainPosition]
                }`}
              >
                {player.mainPosition}
              </p>
            </div>

            {/* Compact Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Link
                href={`/team/${player.playerOwnerSlug}`}
                className="flex items-center gap-2 bg-[#1a1d29] rounded-lg p-2 shadow shadow-white/10"
              >
                <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F7B801] shrink-0" />
                <div className="min-w-0 overflow-hidden">
                  <div className="text-sm sm:text-base text-gray-400 leading-tight">
                    Dono
                  </div>
                  <div className="text-sm font-semibold text-white truncate capitalize">
                    {player.playerOwner}
                  </div>
                </div>
              </Link>

              <div className="flex items-center gap-2 bg-[#1a1d29] rounded-lg p-2 shadow shadow-white/10">
                <Ruler className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F7B801] shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm sm:text-base text-gray-400 leading-tight">
                    Altura
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {player.height.toFixed(2)}m
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-[#1a1d29] rounded-lg p-2 shadow shadow-white/10">
                <Footprints className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F7B801] shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm sm:text-base text-gray-400 leading-tight">
                    Pé
                  </div>
                  <div className="text-sm font-semibold text-white truncate">
                    {player.strongerFoot} (
                    {player.strongerFoot.toLowerCase() === "left"
                      ? "canhoto"
                      : "destro"}
                    )
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-[#1a1d29] rounded-lg p-2 shadow shadow-white/10">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F7B801] shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm sm:text-base text-gray-400 leading-tight">
                    Posições
                  </div>
                  <div className="text-sm font-bold">
                    {player.positions
                      .map((position, index) => (
                        <span
                          key={index}
                          className={`${positionColors[position]} font-bold`}
                        >
                          {position}
                        </span>
                      ))
                      .reduce<(string | ReactElement)[]>(
                        (prev, curr, index) => {
                          if (index === 0) return [curr];
                          return [...prev, ", ", curr];
                        },
                        []
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="bg-[#1a1d29] rounded-xl p-2 sm:p-6 border border-[#3d424f]/50">
            <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-3">
              <div className="w-full">
                <Hability hability="attack" value={player.attack} />
                <Hability hability="defense" value={player.defense} />
                <Hability hability="body balance" value={player.balance} />
                <Hability hability="stamina" value={player.stamina} />
                <Hability hability="top speed" value={player.topSpeed} />
                <Hability hability="acceleration" value={player.acceleration} />
                <Hability hability="response" value={player.response} />
                <Hability hability="agility" value={player.agility} />
                <Hability
                  hability="dribble acc."
                  value={player.dribbleAccuracy}
                />
                <Hability
                  hability="dribble speed"
                  value={player.dribbleSpeed}
                />
                <Hability
                  hability="s. pass acc."
                  value={player.shortPassAccuracy}
                />
                <Hability
                  hability="s. pass speed"
                  value={player.shortPassSpeed}
                />
                <Hability
                  hability="l. pass acc."
                  value={player.longPassAccuracy}
                />
                <Hability
                  hability="l. pass speed"
                  value={player.longPassSpeed}
                />
                <Hability hability="shot acc." value={player.shotAccuracy} />
                <Hability hability="shot power" value={player.shotPower} />
                <Hability
                  hability="shot technique"
                  value={player.shotTechnique}
                />
              </div>

              <div className="w-full">
                <Hability hability="FK acc." value={player.freeKickAccuracy} />
                <Hability hability="swerve" value={player.swerve} />
                <Hability hability="header" value={player.heading} />
                <Hability hability="jump" value={player.jump} />
                <Hability hability="technique" value={player.technique} />
                <Hability hability="aggression" value={player.aggression} />
                <Hability hability="mentality" value={player.mentality} />
                <Hability
                  hability="keeper skills"
                  value={player.goalKeeperSkills}
                />
                <Hability hability="team work" value={player.teamwork} />
                <Hability
                  hability="condition"
                  value={player.conditionFitness}
                  conditionAndWeek={conditionAndWeekTextColor(
                    player.conditionFitness
                  )}
                />
                <Hability
                  hability="Weak foot acc."
                  value={player.weakFootAccuracy}
                  conditionAndWeek={conditionAndWeekTextColor(
                    player.weakFootAccuracy
                  )}
                />
                <Hability
                  hability="Weak foot freq."
                  value={player.weakFootFrequency}
                  conditionAndWeek={conditionAndWeekTextColor(
                    player.weakFootFrequency
                  )}
                />

                <p className="text-lg flex items-center justify-between capitalize">
                  Injury{" "}
                  <span className={`${injuryTextColor(player)} font-bold`}>
                    {player.injuryTolerance}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 sm:mt-8 pt-4 sm:pt-6 border-t border-[#555c6d]">
            <div className="grid grid-cols-2 px-5 gap-x-2 gap-y-2">
              {player.stars.map((star) => (
                <Badge
                  key={star}
                  className="bg-[#2b2f3e] text-[#F7B801] border border-[#F7B801]/30 hover:bg-[#F7B801]/10 text-sm"
                >
                  <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 fill-[#F7B801]" />
                  {star}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
