import { parkLocalStorageName } from "@/config";
import { PokeAPIPokemon } from "@/config/types";
import { randomResult } from "@/config/utils";
import { useFetchWildPokemon } from "@/hooks/useFetchWildPokemon";
import { Park, useLocalStorage } from "@/hooks/useLocalStorage";
import { Action } from "@/modules/Controller";
import { Panel, PanelAction } from "@/modules/Panel";
import { Scene } from "@/modules/Scene";
import { SceneTitle } from "@/modules/SceneTitle";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { positionCenter } from "../_app";

type FieldPath = "kusamura";

const parseFieldName = (path: FieldPath): string => {
  switch (path) {
    case "kusamura":
      return "くさむら";
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
  const [wildPokemon, setWildPokemon] = useState<PokeAPIPokemon | null>(null);
  const fetchWildPokemon = useFetchWildPokemon();
  const [currentPanelIndex, setCurrentPanelIndex] = useState<number>(0);

  const goToResult = () => {
    if (!park) return;
    setPark({
      ...park,
      isStart: false,
    });
    router.push("/park/result");
  };

  useEffect(() => {
    if (isEncounter === null) return;
    if (isEncounter) {
      const index = panelActions.findIndex(
        (action) => action.label === "appearPokemon"
      );
      setCurrentPanelIndex(index);
      appearPokemon();
      return;
    }
    if (!isEncounter) {
      const index = panelActions.findIndex(
        (action) => action.label === "notAppearPokemon"
      );
      setCurrentPanelIndex(index);
      return;
    }
  }, [isEncounter]);

  useEffect(() => {
    if (isCapturePokemon == null) return;
    isCapturePokemon ? capture() : failure();
  }, [isCapturePokemon]);

  const appearPokemon = async () => {
    // TODO: ポケモン出現の頻度は調整したい、ルギアすぐ出てくる
    setWildPokemon(await fetchWildPokemon());
  };

  const search = () => {
    setIsEncounter(randomResult(5));
  };

  const runAway = () => {
    const index = panelActions.findIndex(
      (action) => action.label === "runAway"
    );
    setCurrentPanelIndex(index);
    setIsEncounter(null);
  };

  const throwBall = () => {
    if (!park) return;
    if (park.remainBallCount === 0) {
      const index = panelActions.findIndex(
        (action) => action.label === "BallIsGone"
      );
      setCurrentPanelIndex(index);
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
    if (!park) return;
    if (!wildPokemon) return;
    const index = panelActions.findIndex(
      (action) => action.label === "capturePokemon"
    );
    setCurrentPanelIndex(index);
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
    const index = panelActions.findIndex(
      (action) => action.label === "canNotCapturePokemon"
    );
    setCurrentPanelIndex(index);
  };

  const returnField = () => {
    setCurrentPanelIndex(0);
    setIsCapturePokemon(null);
    setIsEncounter(null);
    setWildPokemon(null);
  };

  const AppearPokemon = () => {
    if (!wildPokemon) return <></>;
    return (
      <Box sx={{ ...positionCenter }}>
        {isCapturePokemon ? (
          <Image
            width="40"
            height="40"
            src="/images/monster_ball.svg"
            alt="モンスターボール"
          />
        ) : (
          <>
            <Typography align="center">{wildPokemon.name}</Typography>
            <Image
              width="100"
              height="100"
              src={wildPokemon.sprites.front_default}
              alt={wildPokemon.name}
            />
          </>
        )}
      </Box>
    );
  };

  const captureActions: Action[] = [
    {
      label: "逃げる",
      fn: runAway,
      hidden: !isEncounter || !wildPokemon || isCapturePokemon === true,
    },
    {
      label: `ボール（残り${park ? park.remainBallCount : ""}）`,
      fn: throwBall,
      hidden: !isEncounter || !wildPokemon || isCapturePokemon === true,
    },
  ];

  const fieldActions: Action[] = [
    {
      label: "パークを出る",
      fn: goToResult,
      hidden: isEncounter || park?.remainBallCount !== 0,
    },
    {
      label: "あたりを探す",
      fn: search,
      hidden: isEncounter || park?.remainBallCount === 0,
    },
    {
      label: "別のフィールドへ",
      fn: () => router.push("/park"),
      hidden: isEncounter || park?.remainBallCount === 0,
    },
    {
      label: "フィールドへ",
      fn: returnField,
      hidden: !isEncounter || !wildPokemon || !isCapturePokemon,
    },
  ];

  const panelActions: PanelAction<
    | "notAppearPokemon"
    | "appearPokemon"
    | "runAway"
    | "canNotCapturePokemon"
    | "capturePokemon"
    | "selectAction"
    | "BallIsGone"
  >[] = [
    {
      text: `${parseFieldName(
        field
      )}でポケモンを探しましょう！（ボールの残り：${park?.remainBallCount}）`,
      controllerActions: fieldActions,
      isNextDisable: true,
    },
    {
      label: "notAppearPokemon",
      text: "ここには何もいないようだ",
      controllerActions: fieldActions,
      isNextDisable: true,
    },
    {
      label: "appearPokemon",
      text: `あ、やせいの${wildPokemon?.name}があらわれた！`,
    },
    {
      label: "selectAction",
      text: "何をする？",
      controllerActions: captureActions,
      isNextDisable: true,
    },
    {
      label: "runAway",
      text: "ここはいったんにげよう！",
      nextFn: returnField,
    },
    {
      label: "canNotCapturePokemon",
      text: "おしい、もうちょっとだったのに！",
      nextFn: () => setCurrentPanelIndex(3),
    },
    {
      label: "capturePokemon",
      text: `やった！${wildPokemon?.name}を捕まえた！`,
    },
    {
      text: `${wildPokemon?.name}のデータがあたらしく登録されました。`,
      nextFn: returnField,
    },
    {
      label: "BallIsGone",
      text: "ああ、手持ちのボールがなくなってしまいました！",
      nextFn: () => setCurrentPanelIndex(3),
    },
  ];

  return (
    <div>
      <SceneTitle title={`サファリパーク内 - ${parseFieldName(field)}`} />
      <Panel
        actions={panelActions}
        currentIndex={currentPanelIndex}
        setCurrentIndex={setCurrentPanelIndex}
      />
      <Scene>{isEncounter ? <AppearPokemon /> : <></>}</Scene>
    </div>
  );
}
