import { db } from "../../_lib/prisma";
import Compare from "../_components/compare";
import CompareError from "../_components/error";

type CompareProps = {
  params: Promise<{ playerId: string }>;
  searchParams: Promise<{ with?: string }>;
};

export default async function ComparePage(props: CompareProps) {
  // Aguarde ambos params e searchParams
  const [params, searchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ]);

  const playerA = await db.players.findUnique({
    where: { id: params.playerId },
  });

  const playerB = searchParams.with
    ? await db.players.findUnique({ where: { id: searchParams.with } })
    : null;

  if (!playerB || !playerA) {
    return <CompareError />;
  }

  return <Compare playerA={playerA} playerB={playerB} />;
}
