import { Action, Controller } from "@/modules/Controller";
import { Quote } from "@/modules/Quote";
import { Scene } from "@/modules/Scene";
import { SceneTitle } from "@/modules/SceneTitle";
import { SetPartner } from "@/modules/start/SetPartner";
import { SetPlayerName } from "@/modules/start/SetPlayerName";
import { gameStart } from "@/stores/saveSlices";
import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type Scene =
  | "setPlayerName"
  | "greeting"
  | "setFirstPokemon"
  | "closingTalk";

export default function Start() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [scene, setScene] = useState<Scene>("setPlayerName");
  const state = useAppSelector((state) => state);

  useEffect(() => {
    if (scene !== "closingTalk") return;
    dispatch(gameStart(""));
  }, [scene]);

  const start = () => {
    router.push("/");
  };

  const actions: Action[] = [
    {
      label: "次へ",
      fn: () => setScene("setFirstPokemon"),
      hidden: scene !== "greeting",
    },
    {
      label: "ゲームスタート",
      fn: start,
      hidden: scene !== "closingTalk",
    },
  ];

  const SceneComponent = () => {
    switch (scene) {
      case "setPlayerName":
        return (
          <>
            <Quote>
              <Typography>はじめにあなたの名前を教えてください</Typography>
            </Quote>
            <SetPlayerName setScene={setScene} />
          </>
        );
      case "greeting":
        return (
          <>
            <Typography>こんにちは、{state.save.name}さん！</Typography>
            <Typography>
              サファリパークだけできるポケモンへようこそ。たくさん遊んで月曜日にそなえましょう！
            </Typography>
          </>
        );
      case "setFirstPokemon":
        return (
          <>
            <Quote>
              <Typography>
                さあ、まずは最初のパートナーをきめましょう！
              </Typography>
            </Quote>
            <SetPartner setScene={setScene} />
          </>
        );
      case "closingTalk":
        return (
          <Quote>
            <Typography>
              {state.save.name}
              さんとパートナーの{state.local.pokemons[0].name}
              の、最初のデータがすべてきちんと作成されました！
            </Typography>
            <Typography>
              こまめにセーブをするのは、忘れないでくださいね。
            </Typography>
          </Quote>
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <SceneTitle title="はじめに" />
      <Quote>
        <Typography>
          こんにちは、サファリパークの冒険をはじめましょう。
        </Typography>
      </Quote>
      <Scene>
        <SceneComponent />
      </Scene>
      <Controller actions={actions} />
    </>
  );
}
