import { Panel } from "@/modules/Panel";
import { StatusScreen } from "@/modules/StatusScreen";
import { SceneTitle } from "@/modules/SceneTitle";
import { SetPartner } from "@/modules/start/SetPartner";
import { SetPlayerName } from "@/modules/start/SetPlayerName";
import { gameStart } from "@/stores/saveSlices";
import { useAppDispatch, useAppSelector } from "hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ActionEvent, PanelAction } from "@/config/types";
import { Controller } from "@/modules/Controller";
import { v4 as uuidv4 } from "uuid";

// export type Scene =
//   | "opening"
//   | "setPlayerName"
//   | "greeting"
//   | "setFirstPokemon"
//   | "closingTalk";

// export type PanelActionLabel = "greeting" | "closingTalk";

type PanelActionType =
  | "setNameGreeting"
  | "setName"
  | "setNameDescription"
  | "nameGreeting"
  | "welcomeSafariPark"
  | "setPartner"
  | "dataCreated"
  | "saveRecommend"
  | "goToStartField";

type SelectActionType = "";

export default function Start() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  // const [scene, setScene] = useState<Scene>("opening");

  const [actionEvent, setActionEvent] = useState<ActionEvent<
    PanelActionType,
    SelectActionType
  > | null>(null);
  const [currentAction, setCurrentAction] = useState<PanelAction<
    PanelActionType,
    SelectActionType
  > | null>(null);

  useEffect(() => {
    // 最初のイベントをセットする
    if (!actionEvent) {
      const action = panelActions.find(
        (action) => action.event === "setNameGreeting"
      );
      if (action == null) return;
      setCurrentAction(action);
      return;
    }

    // TODO: 次へ行って欲しくないときも次へいくのをなんとかする
    // 次へ行けないのであれば何もしない
    // if (currentAction?.isNextDisable === true) return;

    switch (actionEvent.event) {
      case "pushA":
        if (currentAction?.nextEvent != null) {
          setActionEvent({
            uuid: uuidv4(),
            event: currentAction.nextEvent,
          });
        }
        return;
      case "goToStartField":
        router.push("/field/in_front_of_safari_park");
        return;
      default:
      // 何もしない
    }

    // 特にない場合は次のイベントに切り替える
    // イベントがない場合は何もしない
    const action = panelActions.find(
      (action) => action.event === actionEvent.event
    );
    if (action == null) return;
    setCurrentAction(action);
  }, [actionEvent]);

  const panelActions: PanelAction<PanelActionType, SelectActionType>[] = [
    {
      quote:
        "こんにちは、ポケモンの世界へようこそ！サファリパークの冒険をはじめましょう。",
      event: "setNameGreeting",
      nextEvent: "setNameDescription",
    },
    {
      quote: "はじめにあなたの名前を教えてください",
      event: "setNameDescription",
      nextEvent: "setName",
    },
    {
      quote: "名前をフォームに入力してください",
      event: "setName",
      isNextDisable: true,
    },
    {
      quote: `あらためまして、こんにちは、${state.save.name}さん！`,
      event: "nameGreeting",
      nextEvent: "welcomeSafariPark",
    },
    {
      quote:
        "サファリパークだけできるポケモンへようこそ。たくさん遊んで月曜日にそなえましょう！",
      event: "welcomeSafariPark",
      nextEvent: "setPartner",
    },
    {
      quote: "さあ、まずは最初のパートナーをきめましょう！",
      isNextDisable: true,
      event: "setPartner",
    },
    {
      quote: `${state.save.name}さんとパートナーの${
        state.local.pokemons[0]?.name ?? ""
      }の、最初のデータがすべてきちんと作成されました！それでは遊んでみてください`,
      event: "dataCreated",
      nextEvent: "saveRecommend",
    },
    {
      quote: "こまめにセーブをするのは、忘れないでくださいね。",
      event: "saveRecommend",
      nextEvent: "goToStartField",
    },
  ];

  const SceneComponent = () => {
    switch (currentAction?.event) {
      case "setName":
        return (
          <SetPlayerName
            setActionEvent={setActionEvent}
            nextEvent="nameGreeting"
          />
        );
      case "setPartner":
        return (
          <SetPartner setActionEvent={setActionEvent} nextEvent="dataCreated" />
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <SceneTitle title="はじめに" />
      <StatusScreen>
        <SceneComponent />
        <Panel
          isDisplay
          action={currentAction}
          setActionEvent={setActionEvent}
        />
      </StatusScreen>
      <Controller setActionEvent={setActionEvent} />
    </>
  );
}
