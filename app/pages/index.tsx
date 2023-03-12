import { parkLocalStorageName } from "@/config";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { usePlayTime } from "@/hooks/usePlayTime";
import { Action } from "@/modules/SelectPanel";
import { Panel, PanelAction } from "@/modules/Panel";
import { FieldScreen } from "@/modules/FieldScreen";
import { SceneTitle } from "@/modules/SceneTitle";
import { setPokemons } from "@/stores/saveSlices";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { WalkField } from "@/modules/field/WalkField";
import { createFieldInFrontOfSafariPark } from "@/config/field";

export default function Home() {
  const router = useRouter();
  const state = useAppSelector((state) => state);
  const [park, setPark] = useLocalStorage(parkLocalStorageName, null);
  const dispatch = useAppDispatch();
  const [_, savePlayTime] = usePlayTime();
  const [currentActionPanelIndex, setCurrentActionPanelIndex] =
    useState<number>(0);
  const [isPanelDisplay, setIsPanelDisplay] = useState<boolean>(false);

  useEffect(() => {
    // TOPに来た時点でparkのデータが残ってたらゴミなので削除
    if (park) {
      setPark(null);
    }
  }, []);

  // フィールドのための要素
  // 画面上の座標数
  const screenBlockCount = 17;
  // 画面すべての座標数
  const allScreenBlockCount = 24;
  // すべての座標数
  const allBlockCount = allScreenBlockCount + (screenBlockCount - 1);

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
      {/* <SceneTitle title="サファリパーク前" /> */}
      <FieldScreen>
        <WalkField
          field={createFieldInFrontOfSafariPark(allBlockCount)}
          screenBlockCount={screenBlockCount}
          allBlockCount={allBlockCount}
        />
        <Panel
          isDisplay={isPanelDisplay}
          actions={panelActions}
          currentActionIndex={currentActionPanelIndex}
          setCurrentActionIndex={setCurrentActionPanelIndex}
        />
      </FieldScreen>
    </>
  );
}
