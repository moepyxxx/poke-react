import { parkLocalStorageName } from "@/config";
import { PokeAPIPokemon } from "@/config/types";
import { randomResult } from "@/config/utils";
import { useFetchWildPokemon } from "@/hooks/useFetchWildPokemon";
import { Park, useLocalStorage } from "@/hooks/useLocalStorage";
import { Template } from "@/modules/Template";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type FieldPath = "kusamura";

const parseFieldName = (path: FieldPath): string => {
  switch (path) {
    case "kusamura":
      return "草むら";
    default:
      return "";
  }
};

export default function FieldIndex() {
  const router = useRouter();
  const field = router.query.field as FieldPath;
  const [park, setPark] = useLocalStorage<Park>(parkLocalStorageName, null);
  const [isEncounter, setIsEncounter] = useState<boolean | null>(null);
  const [isCapturePokemon, setIsCapturePokemon] = useState<boolean | null>(
    null
  );
  const [searchCount, setSearchCount] = useState<number>(0);
  const [resultText, setResultText] = useState<string>("");
  const [wildPokemon, setWildPokemon] = useState<PokeAPIPokemon | null>(null);
  const fetchWildPokemon = useFetchWildPokemon();

  const goToResult = () => {
    setPark({
      ...park,
      isStart: false,
    });
    router.push("/park/result");
  };

  useEffect(() => {
    console.log("さがした！");

    if (isEncounter == null) {
      setResultText("");
      return;
    }
    if (isEncounter) {
      setResultText("ポケモンが現れた！");
      appearPokemon();
      return;
    }
    if (!isEncounter) {
      setResultText("ここには何もいないようだ");
      return;
    }
  }, [searchCount]);

  useEffect(() => {
    if (isCapturePokemon == null) return;
    isCapturePokemon ? capture() : failure();
  }, [isCapturePokemon]);

  const appearPokemon = () => {
    setWildPokemon(fetchWildPokemon());
  };

  const search = () => {
    setSearchCount(() => searchCount + 1);
    setIsEncounter(randomResult(5));
  };

  const runAway = () => {
    setResultText("");
    setIsEncounter(null);
  };

  const throwBall = () => {
    if (park.remainBallCount === 0) {
      setResultText("手持ちのボールがもうありません！");
      return;
    }
    setPark({
      ...park,
      remainBallCount: park.remainBallCount - 1,
    });

    setIsCapturePokemon(randomResult(3));
  };

  const capture = () => {
    if (!wildPokemon) return;
    setResultText(`やった！${wildPokemon.name}を捕まえた！`);
    console.log(park.capturePokemons, "park.capturePokemons");
    const newPokemons = [
      ...park.capturePokemons,
      {
        id: wildPokemon.id,
        name: wildPokemon.name,
        nickname: "",
      },
    ];
    setPark({
      ...park,
      capturePokemons: newPokemons,
    });
  };

  const failure = () => {
    setResultText("おしい、もうちょっとだったのに！");
  };

  const searchOther = () => {
    setResultText("");
    setIsCapturePokemon(null);
    setIsEncounter(null);
  };

  const ToSearch = () => {
    if (park.remainBallCount === 0) {
      return (
        <>
          <p>ああ、手持ちのボールがなくなってしまいました！</p>
          <button onClick={goToResult}>サファリパークを出る</button>
        </>
      );
    } else {
      return (
        <>
          <button onClick={search}>あたりを探す</button>
          <button onClick={() => router.push("/park")}>他の場所を探す</button>
        </>
      );
    }
  };

  const AppearPokemon = () => {
    if (wildPokemon) {
      return (
        <>
          <p>{wildPokemon.name}</p>
          <Image
            width="100"
            height="100"
            src={wildPokemon.sprites.front_default}
            alt={wildPokemon.name}
          />
          {isCapturePokemon ? (
            <button onClick={searchOther}>次のポケモンを探す</button>
          ) : (
            <>
              <button onClick={runAway}>逃げる</button>
              <button onClick={throwBall}>ボールを投げる</button>
            </>
          )}
        </>
      );
    } else {
      return <>チョットマッテネ</>;
    }
  };

  return (
    <Template>
      <div>
        <p>現在いる場所：サファリパーク {parseFieldName(field)}</p>
        <p>
          残りのボール：
          <span suppressHydrationWarning>
            {park ? park.remainBallCount : 0}
          </span>
        </p>
        <p>{resultText}</p>
        {isEncounter ? <AppearPokemon /> : <ToSearch />}
      </div>
    </Template>
  );
}
