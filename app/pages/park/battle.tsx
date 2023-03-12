import { parkLocalStorageName } from "@/config";
import { PokeAPIPokemon } from "@/config/types";
import { randomResult } from "@/config/utils";
import { useFetchWildPokemon } from "@/hooks/useFetchWildPokemon";
import { Park, useLocalStorage } from "@/hooks/useLocalStorage";
import { Action } from "@/modules/Controller";
import { Panel, PanelAction } from "@/modules/Panel";
import { Scene } from "@/modules/FieldScreen";
import { SceneTitle } from "@/modules/SceneTitle";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { positionCenter } from "../_app";

export default function Battle() {
  const router = useRouter();
  const [park, setPark] = useLocalStorage<Park>(parkLocalStorageName, null);
  const [isCapturePokemon, setIsCapturePokemon] = useState<boolean | null>(
    null
  );
  const [wildPokemon, setWildPokemon] = useState<PokeAPIPokemon | null>(null);
  const fetchWildPokemon = useFetchWildPokemon();
  const [currentActionPanelIndex, setCurrentActionPanelIndex] =
    useState<number>(0);

  useEffect(() => {
    if (isCapturePokemon == null) return;
    isCapturePokemon ? capture() : failure();
  }, [isCapturePokemon]);

  useEffect(() => {
    appearPokemon();
  }, []);

  const appearPokemon = async () => {
    // TODO: ポケモン出現の頻度は調整したい、ルギアすぐ出てくる
    setWildPokemon(await fetchWildPokemon());
  };

  const runAway = () => {
    const index = panelActions.findIndex(
      (action) => action.label === "runAway"
    );
    setCurrentActionPanelIndex(index);
  };

  const throwBall = () => {
    if (!park) return;
    if (park.remainBallCount === 0) {
      const index = panelActions.findIndex(
        (action) => action.label === "BallIsGone"
      );
      setCurrentActionPanelIndex(index);
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
    setCurrentActionPanelIndex(index);
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
    setCurrentActionPanelIndex(index);
  };

  const returnField = () => {
    setIsCapturePokemon(null);
    setWildPokemon(null);
    router.push(`/park/${park?.field}`);
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
      hidden: !wildPokemon || isCapturePokemon === true,
    },
    {
      label: `ボール（残り${park ? park.remainBallCount : ""}）`,
      fn: throwBall,
      hidden: !wildPokemon || isCapturePokemon === true,
    },
    {
      label: "フィールドへ",
      fn: returnField,
      hidden: !wildPokemon || !isCapturePokemon,
    },
  ];

  const panelActions: PanelAction<
    | "runAway"
    | "canNotCapturePokemon"
    | "capturePokemon"
    | "selectAction"
    | "BallIsGone"
  >[] = [
    {
      quote: `あ、やせいの${wildPokemon?.name}があらわれた！`,
    },
    {
      label: "selectAction",
      quote: "何をする？",
      controllerActions: captureActions,
      isNextDisable: true,
    },
    {
      label: "runAway",
      quote: "ここはいったんにげよう！",
      nextFn: returnField,
    },
    {
      label: "canNotCapturePokemon",
      quote: "おしい、もうちょっとだったのに！",
      nextFn: () => setCurrentActionPanelIndex(1),
    },
    {
      label: "capturePokemon",
      quote: `やった！${wildPokemon?.name}を捕まえた！`,
    },
    {
      quote: `${wildPokemon?.name}のデータがあたらしく登録されました。`,
      nextFn: returnField,
    },
    {
      label: "BallIsGone",
      quote: "ああ、手持ちのボールがなくなってしまいました！",
      nextFn: () => setCurrentActionPanelIndex(1),
    },
  ];

  return (
    <div>
      <SceneTitle title={`バトル`} />
      <Panel
        actions={panelActions}
        currentActionIndex={currentActionPanelIndex}
        setCurrentActionIndex={setCurrentActionPanelIndex}
      />
      <Scene>
        <AppearPokemon />
      </Scene>
    </div>
  );
}
