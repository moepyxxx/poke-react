import { parkLocalStorageName } from "@/config";
import { FieldPath } from "@/config/types";
import { parseFieldName, randomResult } from "@/config/utils";
import { Park, useLocalStorage } from "@/hooks/useLocalStorage";
import { Action } from "@/modules/Controller";
import { Panel, PanelAction } from "@/modules/Panel";
import { Scene } from "@/modules/FieldScreen";
import { SceneTitle } from "@/modules/SceneTitle";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FieldIndex() {
  const router = useRouter();
  const field = router.query.field as FieldPath;
  const [park, setPark] = useLocalStorage<Park>(parkLocalStorageName, null);
  const [currentActionPanelIndex, setCurrentActionPanelIndex] =
    useState<number>(0);

  useEffect(() => {
    if (!park) return;

    setPark({
      ...park,
      field: field,
    });
  }, []);

  const goToResult = () => {
    if (!park) return;
    setPark({
      ...park,
      isStart: false,
    });
    router.push("/park/result");
  };

  const search = () => {
    const isEncounter = randomResult(5);
    if (isEncounter) {
      router.push("/park/battle");
      return;
    }
    if (!isEncounter) {
      const index = panelActions.findIndex(
        (action) => action.label === "notAppearPokemon"
      );
      setCurrentActionPanelIndex(index);
      return;
    }
  };

  const fieldActions: Action[] = [
    {
      label: "パークを出る",
      fn: goToResult,
      hidden: park?.remainBallCount !== 0,
    },
    {
      label: "あたりを探す",
      fn: search,
      hidden: park?.remainBallCount === 0,
    },
    {
      label: "別のフィールドへ",
      fn: () => router.push("/park"),
      hidden: park?.remainBallCount === 0,
    },
  ];

  const panelActions: PanelAction<"notAppearPokemon">[] = [
    {
      quote: `${parseFieldName(
        field
      )}でポケモンを探しましょう！（ボールの残り：${park?.remainBallCount}）`,
      controllerActions: fieldActions,
      isNextDisable: true,
    },
    {
      label: "notAppearPokemon",
      quote: "ここには何もいないようだ",
      nextFn: () => setCurrentActionPanelIndex(0),
    },
  ];

  return (
    <div>
      <SceneTitle title={`サファリパーク内 - ${parseFieldName(field)}`} />
      <Panel
        actions={panelActions}
        currentActionIndex={currentActionPanelIndex}
        setCurrentActionIndex={setCurrentActionPanelIndex}
      />
      <Scene>
        <></>
      </Scene>
    </div>
  );
}
