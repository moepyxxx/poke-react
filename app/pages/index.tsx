// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "@next/font/google";
// import styles from "@/styles/Home.module.css";

import { useAppSelector } from "hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const player = useAppSelector((state) => state.player);

  useEffect(() => {
    if (!player.isSet) {
      router.push("start");
    }
  }, [router, player]);

  return (
    <>
      <div>TOP</div>
      <p>{player ? player.name : ""}</p>
    </>
  );
}
