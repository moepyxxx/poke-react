import { parkLocalStorageName } from "@/config";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { usePlayTime } from "@/hooks/usePlayTime";
import { Action } from "@/modules/Controller";
import { Panel, PanelAction } from "@/modules/Panel";
import { Scene } from "@/modules/Scene";
import { SceneTitle } from "@/modules/SceneTitle";
import { setPokemons } from "@/stores/saveSlices";
import { Box } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { positionCenter } from "./_app";

export default function Home() {
  const router = useRouter();
  const state = useAppSelector((state) => state);
  const [park, setPark] = useLocalStorage(parkLocalStorageName, null);
  const dispatch = useAppDispatch();
  const [_, savePlayTime] = usePlayTime();
  const [currentActionPanelIndex, setCurrentActionPanelIndex] =
    useState<number>(0);

  useEffect(() => {
    // TOPに来た時点でparkのデータが残ってたらゴミなので削除
    if (park) {
      setPark(null);
    }
  }, []);

  const save = () => {
    savePlayTime();
    dispatch(setPokemons(state.local.pokemons));
    const index = panelActions.findIndex((action) => action.label === "save");
    setCurrentActionPanelIndex(index);
  };

  const start = () => {
    router.push("/park");
  };

  const actions: Action[] = [
    { label: "パークへ入る", fn: start },
    { label: "ポケモン", fn: () => router.push("/status") },
    { label: "ポケモンずかん", fn: () => router.push("/books") },
    { label: "セーブする", fn: save },
  ];

  const panelActions: PanelAction<"save">[] = [
    {
      quote: "なにをしますか？",
      controllerActions: actions,
      isNextDisable: true,
    },
    {
      label: "save",
      quote: "セーブできました！",
      nextFn: () => setCurrentActionPanelIndex(0),
    },
  ];

  return (
    <>
      <SceneTitle title="サファリパーク前" />
      <Scene>
        <Box sx={{ ...positionCenter }}>
          <Image
            width="320"
            height="250"
            src="/images/safari_park.svg"
            alt="サファリパーク"
          />
        </Box>
      </Scene>
      <Panel
        actions={panelActions}
        currentActionIndex={currentActionPanelIndex}
        setCurrentActionIndex={setCurrentActionPanelIndex}
      />
    </>
  );
}
