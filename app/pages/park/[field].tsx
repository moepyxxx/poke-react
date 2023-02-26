import { parkLocalStorageName } from "@/config";
import { PokeAPIPokemon } from "@/config/types";
import { randomResult } from "@/config/utils";
import { useFetchWildPokemon } from "@/hooks/useFetchWildPokemon";
import { Park, useLocalStorage } from "@/hooks/useLocalStorage";
import { Action, Controller } from "@/modules/Controller";
import { Quote } from "@/modules/Quote";
import { Scene } from "@/modules/Scene";
import { SceneTitle } from "@/modules/SceneTitle";
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

  const appearPokemon = async () => {
    // TODO: ポケモン出現の頻度は調整したい、ルギアすぐ出てくる
    setWildPokemon(await fetchWildPokemon());
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

    // TODO: 捕まえやすさロジックにゲーム性を持たせたい
    setIsCapturePokemon(randomResult(3));
  };

  const capture = () => {
    if (!wildPokemon) return;
    setResultText(`やった！${wildPokemon.name}を捕まえた！`);
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
    if (!park || park.remainBallCount !== 0) return <></>;
    return <p>ああ、手持ちのボールがなくなってしまいました！</p>;

    // if (park.remainBallCount === 0) {
    //   return (
    //     <>
    //       <p>ああ、手持ちのボールがなくなってしまいました！</p>
    //       <button onClick={goToResult}>サファリパークを出る</button>
    //     </>
    //   );
    // } else {
    //   return (
    //     <>
    //       <button onClick={search}>あたりを探す</button>
    //       <button onClick={() => router.push("/park")}>他の場所を探す</button>
    //     </>
    //   );
    // }
  };

  const AppearPokemon = () => {
    if (!wildPokemon) return <></>;
    return (
      <>
        <p>{wildPokemon.name}</p>
        <Image
          width="100"
          height="100"
          src={wildPokemon.sprites.front_default}
          alt={wildPokemon.name}
        />
        {/* {isCapturePokemon ? (
            <button onClick={searchOther}>次のポケモンを探す</button>
          ) : (
            <>
              <button onClick={runAway}>逃げる</button>
              <button onClick={throwBall}>ボールを投げる</button>
            </>
          )} */}
      </>
    );
    // } else {
    //   return <p>チョットマッテネ</p>;
    // }
  };

  const actions: Action[] = [
    {
      label: "サファリパークを出る",
      fn: goToResult,
      hidden: isEncounter || park.remainBallCount !== 0,
    },
    {
      label: "あたりを探す",
      fn: search,
      hidden: isEncounter || park.remainBallCount === 0,
    },
    {
      label: "他の場所を探す",
      fn: () => router.push("/park"),
      hidden: isEncounter || park.remainBallCount === 0,
    },
    {
      label: "次のポケモンを探す",
      fn: searchOther,
      hidden: !isEncounter || !wildPokemon || !isCapturePokemon,
    },
    {
      label: "逃げる",
      fn: runAway,
      hidden: !isEncounter || !wildPokemon || isCapturePokemon === true,
    },
    {
      label: "ボールを投げる",
      fn: throwBall,
      hidden: !isEncounter || !wildPokemon || isCapturePokemon === true,
    },
  ];

  return (
    <div>
      <SceneTitle title={`サファリパーク内 - ${parseFieldName(field)}`} />
      <Quote>
        <p>{resultText}</p>
      </Quote>
      <Scene>
        <p>
          残りのボール：
          <span suppressHydrationWarning>
            {park ? park.remainBallCount : 0}
          </span>
        </p>
        {isEncounter ? <AppearPokemon /> : <ToSearch />}
      </Scene>
      <Controller actions={actions} />
    </div>
  );
}
