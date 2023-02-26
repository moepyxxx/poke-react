import { parkLocalStorageName } from "@/config";
import { useAppDispatch } from "@/hooks";
import { Park, useLocalStorage } from "@/hooks/useLocalStorage";
import { Action, Controller } from "@/modules/Controller";
import { Quote } from "@/modules/Quote";
import { Scene } from "@/modules/Scene";
import { SceneTitle } from "@/modules/SceneTitle";
import { addPokemons } from "@/stores/localDataSlices";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ParkResult() {
  const [park, setPark] = useLocalStorage<Park>(parkLocalStorageName, null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (park.isStart && park.remainBallCount > 0) {
      router.push("/park");
    }
  }, []);

  const returnToTop = () => {
    dispatch(addPokemons(park.capturePokemons));
    setPark(null);
    router.push("/");
  };

  if (!park) return <></>;

  const actions: Action[] = [{ label: "パーク前に戻る", fn: returnToTop }];

  return (
    <>
      <SceneTitle title="たんけん結果" />
      <Quote>
        <Typography>
          おめでとう。あなたはサファリパークでポケモンを
          <span suppressHydrationWarning>{park.capturePokemons.length}</span>
          ひきゲットしました！
        </Typography>
      </Quote>
      <Scene>
        {park.capturePokemons.map((pokemon, index) => {
          return (
            <p key={`${index}-${pokemon.id}`} suppressHydrationWarning>
              {pokemon.name}
            </p>
          );
        })}
      </Scene>
      {/** TODO: ニックネーム or 逃す */}
      <Controller actions={actions} />
    </>
  );
}
