// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "@next/font/google";
// import styles from "@/styles/Home.module.css";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { usePlayTime } from "@/hooks/usePlayTime";
import { Template } from "@/modules/Template";
import { setPokemons } from "@/stores/saveSlices";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [_, setSavePlayTime] = usePlayTime();

  const save = () => {
    dispatch(setPokemons([...state.save.pokemons, ...state.local.pokemons]));
    setSavePlayTime();
    console.log("セーブできました！");
  };

  const start = () => {
    router.push("/park");
  };

  return (
    <Template>
      <div>
        <p>現在いる場所：サファリパーク前</p>
      </div>
      <div>
        <button onClick={start}>サファリパークへいく</button>
      </div>
      <div>
        <button onClick={() => router.push("/status")}>
          持っているポケモン
        </button>
      </div>
      <div>
        <button onClick={() => router.push("/books")}>ポケモンずかん</button>
      </div>
      <div>
        <button onClick={save}>セーブする</button>
      </div>
    </Template>
  );
}
