import { parkLocalStorageName } from "@/config";
import { useAppDispatch } from "@/hooks";
import { Park, useLocalStorage } from "@/hooks/useLocalStorage";
import { Action } from "@/modules/Controller";
import { Panel, PanelAction } from "@/modules/Panel";
import { Scene } from "@/modules/Scene";
import { SceneTitle } from "@/modules/SceneTitle";
import { addPokemons } from "@/stores/localDataSlices";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ParkResult() {
  const [park, setPark] = useLocalStorage<Park>(parkLocalStorageName, null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [currentPanelIndex, setCurrentPanelIndex] = useState<number>(0);

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
  const panelActions: PanelAction<"">[] = [
    {
      text: `おめでとう。あなたはサファリパークでポケモンを${park.capturePokemons.length}ひきゲットしました！`,
      controllerActions: actions,
      isNextDisable: true,
    },
  ];

  return (
    <>
      <SceneTitle title="たんけん結果" />
      <Scene>
        {park.capturePokemons.map((pokemon, index) => {
          return (
            <Typography
              align="center"
              key={`${index}-${pokemon.id}`}
              suppressHydrationWarning
            >
              {pokemon.name}
            </Typography>
          );
        })}
      </Scene>
      {/** TODO: ニックネーム or 逃す */}
      <Panel
        actions={panelActions}
        currentIndex={currentPanelIndex}
        setCurrentIndex={setCurrentPanelIndex}
      />
    </>
  );
}
