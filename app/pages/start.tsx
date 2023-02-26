import { SetPartner } from "@/modules/start/SetPartner";
import { SetPlayerName } from "@/modules/start/SetPlayerName";
import { gameStart } from "@/stores/saveSlices";
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

  switch (scene) {
    case "setPlayerName":
      return <SetPlayerName setScene={setScene} />;
    case "greeting":
      return (
        <>
          <p>こんにちは、{state.save.name}さん！</p>
          <p>サファリパークだけできるポケモンへようこそ。</p>
          <p>いっぱい遊んでくださいね。</p>
          <button onClick={() => setScene("setFirstPokemon")}>次へ</button>
        </>
      );
    case "setFirstPokemon":
      return <SetPartner setScene={setScene} />;
    case "closingTalk":
      return (
        <>
          <p>
            {state.save.name}
            さんとパートナーの{state.local.pokemons[0].name}
            の、最初のデータがすべてきちんと作成されました！
          </p>
          <p>こまめにセーブをするのは、忘れないでくださいね。</p>
          <button onClick={start}>ゲームスタート</button>
        </>
      );
    default:
      return <></>;
  }
}
