import { SetPartner } from "@/modules/start/SetPartner";
import { SetPlayerName } from "@/modules/start/SetPlayerName";
import { useAppSelector } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";

export type Scene =
  | "setPlayerName"
  | "greeting"
  | "setFirstPokemon"
  | "closingTalk";

export default function Start() {
  const router = useRouter();
  const [scene, setScene] = useState<Scene>("setPlayerName");
  const state = useAppSelector((state) => state);

  const gameStart = () => {
    router.push("/");
  };

  switch (scene) {
    case "setPlayerName":
      return <SetPlayerName setScene={setScene} />;
    case "greeting":
      return (
        <>
          <p>こんにちは、{state.player.name}さん！</p>
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
            {state.player.name}
            さんとパートナーの{state.player.pokemons[0].name}
            の、最初のデータがすべてきちんと作成されました！
          </p>
          <p>こまめにセーブをするのは、忘れないでくださいね。</p>
          <button onClick={gameStart}>ゲームスタート</button>
        </>
      );
    default:
      return <></>;
  }
}
