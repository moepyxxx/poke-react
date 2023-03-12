import { parkLocalStorageName } from "@/config";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { usePlayTime } from "@/hooks/usePlayTime";
import { Panel } from "@/modules/Panel";
import { FieldScreen } from "@/modules/FieldScreen";
import { SceneTitle } from "@/modules/SceneTitle";
import { setPokemons } from "@/stores/saveSlices";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { WalkField } from "@/modules/field/WalkField";
import { createFieldInFrontOfSafariPark } from "@/config/field";
import { ActionEvent, PanelAction } from "@/config/types";
import { v4 as uuidv4 } from "uuid";
import { Controller } from "@/modules/Controller";

type PanelActionType = "selectAction" | "endSave" | "panelReset";
type SelectActionType =
  | "selectGoToPark"
  | "selectStatus"
  | "selectPokemonBook"
  | "selectSave";

export default function InFrontOfSafariPark() {
  const router = useRouter();

  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  // const [_, savePlayTime] = usePlayTime();
  const [isPanelDisplay, setIsPanelDisplay] = useState<boolean>(false);
  const [actionEvent, setActionEvent] = useState<ActionEvent<
    PanelActionType,
    SelectActionType
  > | null>(null);
  const [currentAction, setCurrentAction] = useState<PanelAction<
    PanelActionType,
    SelectActionType
  > | null>(null);

  // TODO: アクションに対する操作はある程度関数に落とし込めるのでカスタムフックかHOCパターンとかにしたい
  useEffect(() => {
    if (!actionEvent) return;

    // アクションに対して関数がある場合はそれを実行（特別パターン）
    // WalkFieldもactionEventをwatchしており指定した右左上下へ移動する動作が発生する
    // そのためpushRight, pushLeft, pushAbove, pushBelowはここでは何もしない
    // 見通しが悪いがこのコンポーネントで移動系の状態を持ちたくないので仕方なく…
    switch (actionEvent.event) {
      case "pushA":
        if (currentAction?.nextEvent != null) {
          setActionEvent({
            uuid: uuidv4(),
            event: currentAction.nextEvent,
          });
        }
        return;
      case "selectGoToPark":
        goToSafariPark();
        return;
      case "selectSave":
        save();
        return;
      case "selectPokemonBook":
        router.push("/status/books");
        return;
      case "selectStatus":
        router.push("/status/base_status");
        return;
      case "pushStart":
        setIsPanelDisplay(!isPanelDisplay);
        setActionEvent({
          uuid: uuidv4(),
          event: "selectAction",
        });
        return;
      case "pushB":
        setIsPanelDisplay(false);
        return;
      case "panelReset":
        console.log("panelReset kitayo");
        setIsPanelDisplay(false);
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

  // フィールドのための要素
  const screenBlockCount = 17;
  const allScreenBlockCount = 24;
  const allBlockCount = allScreenBlockCount + (screenBlockCount - 1);

  const save = () => {
    // savePlayTime();
    dispatch(setPokemons(state.local.pokemons));

    setActionEvent({
      uuid: uuidv4(),
      event: "endSave",
    });
  };

  const goToSafariPark = () => {
    router.push("/field/safari_park");
  };

  const panelActions: PanelAction<PanelActionType, SelectActionType>[] = [
    {
      event: "selectAction",
      quote: "なにをしますか？",
      selectableActions: [
        { label: "パークへ入る", event: "selectGoToPark" },
        {
          label: "ポケモン",
          event: "selectPokemonBook",
        },
        {
          label: "ポケモンずかん",
          event: "selectPokemonBook",
        },
        { label: "セーブする", event: "selectSave" },
      ],
      isNextDisable: true,
    },
    {
      event: "endSave",
      nextEvent: "panelReset",
      quote: "セーブできました！",
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
          actionEvent={actionEvent}
          setActionEvent={setActionEvent}
        />
        <Panel
          isDisplay={isPanelDisplay}
          action={currentAction}
          setActionEvent={setActionEvent}
        />
      </FieldScreen>
      <Controller setActionEvent={setActionEvent} />
    </>
  );
}
