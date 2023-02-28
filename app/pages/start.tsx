import { Panel, PanelAction } from "@/modules/Panel";
import { Scene } from "@/modules/Scene";
import { SceneTitle } from "@/modules/SceneTitle";
import { SetPartner } from "@/modules/start/SetPartner";
import { SetPlayerName } from "@/modules/start/SetPlayerName";
import { gameStart } from "@/stores/saveSlices";
import { useAppDispatch, useAppSelector } from "hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type Scene =
  | "opening"
  | "setPlayerName"
  | "greeting"
  | "setFirstPokemon"
  | "closingTalk";

export type PanelActionLabel = "greeting" | "closingTalk";

export default function Start() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [scene, setScene] = useState<Scene>("opening");
  const [currentPanelIndex, setCurrentPanelIndex] = useState<number>(0);
  const state = useAppSelector((state) => state);

  const start = () => {
    router.push("/");
  };

  const panelActions: PanelAction<PanelActionLabel>[] = [
    {
      text: "こんにちは、ポケモンの世界へようこそ！サファリパークの冒険をはじめましょう。",
      nextFn: () => setScene("setPlayerName"),
    },
    { text: "はじめにあなたの名前を教えてください", isNextDisable: true },
    {
      text: `あらためまして、こんにちは、${state.save.name}さん！`,
      label: "greeting",
    },
    {
      text: "サファリパークだけできるポケモンへようこそ。たくさん遊んで月曜日にそなえましょう！",
      nextFn: () => setScene("setFirstPokemon"),
    },
    {
      text: "さあ、まずは最初のパートナーをきめましょう！",
      isNextDisable: false,
    },
    {
      text: `${state.save.name}さんとパートナーの${
        state.local.pokemons[0]?.name ?? ""
      }の、最初のデータがすべてきちんと作成されました！`,
      label: "closingTalk",
    },
    {
      text: "こまめにセーブをするのは、忘れないでくださいね。",
      nextFn: start,
    },
  ];

  useEffect(() => {
    if (scene === "greeting" || scene === "closingTalk") {
      const index = panelActions.findIndex((action) => action.label === scene);
      setCurrentPanelIndex(index);
    }
    if (scene === "closingTalk") {
      dispatch(gameStart(""));
    }
  }, [scene]);

  const SceneComponent = () => {
    switch (scene) {
      case "setPlayerName":
        return <SetPlayerName setScene={setScene} />;
      case "setFirstPokemon":
        return <SetPartner setScene={setScene} />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <SceneTitle title="はじめに" />
      <Scene>
        <SceneComponent />
      </Scene>
      <Panel
        actions={panelActions}
        currentIndex={currentPanelIndex}
        setCurrentIndex={setCurrentPanelIndex}
      />
    </>
  );
}
