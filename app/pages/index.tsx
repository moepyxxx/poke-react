// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "@next/font/google";
// import styles from "@/styles/Home.module.css";

import { useAppDispatch } from "@/hooks";
import { Template } from "@/modules/Template";
import { gameStart } from "@/stores/parkSlices";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const save = () => {
    console.log("save");
  };

  const start = () => {
    // TODO 調査: 引数は必要ないはずだけどなぜか引数ないとTSエラーでるし引数入れても問題ない…
    dispatch(gameStart(""));
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
        <button onClick={save}>セーブする</button>
      </div>
    </Template>
  );
}
