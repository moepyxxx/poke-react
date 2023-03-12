import { Panel, PanelAction } from "@/modules/Panel";
import { Screen } from "@/modules/Screen";
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
  const [currentActionPanelIndex, setCurrentActionPanelIndex] =
    useState<number>(0);
  const state = useAppSelector((state) => state);

  const start = () => {
    router.push("/");
  };

  const setName = () => {
    setScene("setPlayerName");
    setCurrentActionPanelIndex((index) => index + 1);
  };

  const setPartner = () => {
    setScene("setFirstPokemon");
    setCurrentActionPanelIndex((index) => index + 1);
  };

  const panelActions: PanelAction<PanelActionLabel>[] = [
    {
      quote:
        "こんにちは、ポケモンの世界へようこそ！サファリパークの冒険をはじめましょう。",
      nextFn: setName,
    },
    { quote: "はじめにあなたの名前を教えてください", isNextDisable: true },
    {
      quote: `あらためまして、こんにちは、${state.save.name}さん！`,
      label: "greeting",
    },
    {
      quote:
        "サファリパークだけできるポケモンへようこそ。たくさん遊んで月曜日にそなえましょう！",
      nextFn: setPartner,
    },
    {
      quote: "さあ、まずは最初のパートナーをきめましょう！",
      isNextDisable: false,
    },
    {
      quote: `${state.save.name}さんとパートナーの${
        state.local.pokemons[0]?.name ?? ""
      }の、最初のデータがすべてきちんと作成されました！`,
      label: "closingTalk",
    },
    {
      quote: "こまめにセーブをするのは、忘れないでくださいね。",
      nextFn: start,
    },
  ];

  useEffect(() => {
    if (scene === "greeting" || scene === "closingTalk") {
      const index = panelActions.findIndex((action) => action.label === scene);
      setCurrentActionPanelIndex(index);
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
      <Screen>
        <SceneComponent />
      </Screen>
      <Panel
        actions={panelActions}
        currentActionIndex={currentActionPanelIndex}
        setCurrentActionIndex={setCurrentActionPanelIndex}
      />
    </>
  );
}
