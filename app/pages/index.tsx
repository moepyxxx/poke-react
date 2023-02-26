import { parkLocalStorageName } from "@/config";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { usePlayTime } from "@/hooks/usePlayTime";
import { Action, Controller } from "@/modules/Controller";
import { Quote } from "@/modules/Quote";
import { Scene } from "@/modules/Scene";
import { SceneTitle } from "@/modules/SceneTitle";
import { setPokemons } from "@/stores/saveSlices";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { positionCenter } from "./_app";

export default function Home() {
  const router = useRouter();
  const state = useAppSelector((state) => state);
  const [park, setPark] = useLocalStorage(parkLocalStorageName, null);
  const dispatch = useAppDispatch();
  const [_, setSavePlayTime] = usePlayTime();

  useEffect(() => {
    // TOPに来た時点でparkのデータが残ってたらゴミなので削除
    if (park) {
      setPark(null);
    }
  }, []);

  const save = () => {
    dispatch(setPokemons(state.local.pokemons));
    setSavePlayTime();
    console.log("セーブできました！");
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

  return (
    <>
      <SceneTitle title="サファリパーク前" />
      <Quote>
        <Typography>なにをしますか？</Typography>
      </Quote>
      <Scene>
        <Box sx={{ ...positionCenter }}>
          <Image
            width="320"
            height="250"
            src="/images/safari_park.svg"
            alt="サファリパーク"
          />
        </Box>
      </Scene>
      <Controller actions={actions} />
    </>
  );
}
