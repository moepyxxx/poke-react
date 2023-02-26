// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "@next/font/google";
// import styles from "@/styles/Home.module.css";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { usePlayTime } from "@/hooks/usePlayTime";
import { Action, Controller } from "@/modules/Controller";
import { Quote } from "@/modules/Quote";
import { Scene } from "@/modules/Scene";
import { SceneTitle } from "@/modules/SceneTitle";
import { setPokemons } from "@/stores/saveSlices";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [_, setSavePlayTime] = usePlayTime();

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
        <Typography>メニューを選んでください。</Typography>
      </Quote>
      <Scene>
        <Controller actions={actions} />
      </Scene>
    </>
  );
}
