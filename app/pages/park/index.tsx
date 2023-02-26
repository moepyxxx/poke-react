import { parkLocalStorageName } from "@/config";
import { Park, useLocalStorage } from "@/hooks/useLocalStorage";
import { Action, Controller } from "@/modules/Controller";
import { Quote } from "@/modules/Quote";
import { Scene } from "@/modules/Scene";
import { SceneTitle } from "@/modules/SceneTitle";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ParkIndex() {
  const router = useRouter();
  const [park, setPark] = useLocalStorage<Park>(parkLocalStorageName, null);

  useEffect(() => {
    if (park) return;

    setPark({
      isStart: true,
      remainBallCount: 4,
      capturePokemons: [],
    });
  }, []);

  // TODO: 水のなか・どうくつとかも追加したい
  const actions: Action[] = [
    { label: "くさむらを探す", fn: () => router.push("/park/kusamura") },
  ];

  return (
    <>
      <SceneTitle title="サファリパーク内" />
      <Quote>
        <Typography>
          残りのボールが0になるまでサファリパーク内を探索しましょう（ボールの残り：
          {park.remainBallCount}）。
        </Typography>
      </Quote>
      {/* <Scene></Scene> */}
      <Controller actions={actions} />
    </>
  );
}
