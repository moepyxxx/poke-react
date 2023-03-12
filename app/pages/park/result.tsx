import { parkLocalStorageName } from "@/config";
import { useAppDispatch } from "@/hooks";
import { useFetchPokemons } from "@/hooks/useFetchPokemons";
import { Park, useLocalStorage } from "@/hooks/useLocalStorage";
import { Action } from "@/modules/SelectPanel";
import { Panel, PanelAction } from "@/modules/Panel";
import { Scene } from "@/modules/FieldScreen";
import { SceneTitle } from "@/modules/SceneTitle";
import { addPokemons } from "@/stores/localDataSlices";
import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ParkResult() {
  const [park, setPark] = useLocalStorage<Park>(parkLocalStorageName, null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [currentActionPanelIndex, setCurrentActionPanelIndex] =
    useState<number>(0);
  const pokemons = useFetchPokemons(
    park ? park.capturePokemons.map((pokemon) => pokemon.id) : []
  );

  useEffect(() => {
    if (!park) return;

    if (park.isStart && park.remainBallCount > 0) {
      router.push("/park");
    }
  }, []);

  const returnToTop = () => {
    if (!park) return;

    dispatch(addPokemons(park.capturePokemons));
    setPark(null);
    router.push("/");
  };

  const actions: Action[] = [{ label: "パーク前に戻る", fn: returnToTop }];
  const panelActions: PanelAction<"">[] = [
    {
      quote: `おめでとう。あなたはサファリパークでポケモンを${park?.capturePokemons.length}ひきゲットしました！`,
      controllerActions: actions,
      isNextDisable: true,
    },
  ];

  if (!park) return <></>;

  return (
    <>
      <SceneTitle title="たんけん結果" />
      <Scene>
        <Grid container spacing={2}>
          {pokemons.map((pokemon, index) => {
            return (
              <Grid
                item
                sx={{ textAlign: "center" }}
                xs={2}
                key={`${index}-${pokemon.id}`}
              >
                <Typography align="center" suppressHydrationWarning>
                  {pokemon.name}
                </Typography>
                <Image
                  width="80"
                  height="80"
                  src={
                    pokemon.sprites.front_default === ""
                      ? "/images/book_unknown_picture.svg"
                      : pokemon.sprites.front_default
                  }
                  alt={`No.${pokemon.id}: ${pokemon.name}`}
                />
              </Grid>
            );
          })}
        </Grid>
      </Scene>
      {/** TODO: ニックネーム or 逃す */}
      <Panel
        actions={panelActions}
        currentActionIndex={currentActionPanelIndex}
        setCurrentActionIndex={setCurrentActionPanelIndex}
      />
    </>
  );
}
