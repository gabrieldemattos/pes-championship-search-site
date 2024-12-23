import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { positionColors } from "@/app/_constants/position-colors";
import { ReactElement } from "react";
import Hability from "./_components/hability";
import Status from "./_components/status";
import PlayerOwnerButton from "./_components/player-owner-button";

const PlayerPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const player = await db.players.findUnique({ where: { id: id } });

  const injuryTextColor = () => {
    if (player?.injuryTolerance === "A") return "text-red-500";
    if (player?.injuryTolerance === "B") return "text-yellow-500";
    return;
  };

  const conditionAndWeekTextColor = (value: number) => {
    if (value === 7) return "text-orange-500";
    if (value === 8) return "text-red-500";
    return;
  };

  if (!player) return notFound();

  return (
    <div className="p-5">
      <div className="mt-5 border pb-1">
        <div className="space-y-2">
          <h1 className="text-lg text-center border-b p-3 font-bold italic">
            {player.name}
          </h1>

          <PlayerOwnerButton
            playerOwner={player.playerOwner}
            playerOwnerSlug={player.playerOwnerSlug}
          />

          <Status status="Altura:" value={`${player.height.toFixed(2)}m`} />

          <Status
            status="Pé:"
            value={`${player.strongerFoot} (${
              player.strongerFoot === "left" ? "canhoto" : "destro"
            })`}
          />

          <Status
            status="Posição:"
            value={player.mainPosition}
            className={`${positionColors[player.mainPosition]}`}
          />

          <p className="border-b py-1 px-2 text-sm">
            Posições:{" "}
            <span className="font-bold">
              {player.positions
                .map((position, index) => (
                  <span
                    key={index}
                    className={`${positionColors[position]} font-bold`}
                  >
                    {position}
                  </span>
                ))
                .reduce<(string | ReactElement)[]>((prev, curr, index) => {
                  if (index === 0) return [curr];
                  return [...prev, ", ", curr];
                }, [])}
            </span>
          </p>
        </div>

        <div className="p-2 flex justify-between space-x-3">
          <div className="w-full">
            <Hability hability="attack" value={player.attack} />
            <Hability hability="defence" value={player.defense} />
            <Hability hability="body balance" value={player.balance} />
            <Hability hability="stamina" value={player.stamina} />
            <Hability hability="top speed" value={player.topSpeed} />
            <Hability hability="acceleration" value={player.acceleration} />
            <Hability hability="response" value={player.response} />
            <Hability hability="agility" value={player.agility} />
            <Hability hability="dribble acc." value={player.dribbleAccuracy} />
            <Hability hability="dribble speed" value={player.dribbleSpeed} />
            <Hability
              hability="s. pass acc."
              value={player.shortPassAccuracy}
            />
            <Hability hability="s. pass speed" value={player.shortPassSpeed} />
            <Hability hability="l. pass acc." value={player.longPassAccuracy} />
            <Hability hability="l. pass speed" value={player.longPassSpeed} />
            <Hability hability="shot acc." value={player.shotAccuracy} />
            <Hability hability="shot power" value={player.shotPower} />
            <Hability hability="shot technique" value={player.shotTechnique} />
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
              <span className={`${injuryTextColor()} font-bold`}>
                {player.injuryTolerance}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 px-5 gap-x-10 gap-y-1">
          {player.stars.map((star) => (
            <div key={star} className="flex items-center gap-2">
              <Star size={18} className="fill-yellow-500 text-yellow-500" />
              <p className="capitalize whitespace-nowrap">{star}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
