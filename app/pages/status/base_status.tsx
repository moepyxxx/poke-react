import { useAppSelector } from "@/hooks";
import { useFetchPokemons } from "@/hooks/useFetchPokemons";
import { Action } from "@/modules/SelectPanel";
import { Panel, PanelAction } from "@/modules/Panel";
import { StatusScreen } from "@/modules/StatusScreen";
import { SceneTitle } from "@/modules/SceneTitle";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Status() {
  const router = useRouter();
  const local = useAppSelector((state) => state.local);
  const capturePokemons = useFetchPokemons(
    local.pokemons.map((pokemon) => pokemon.id)
  );
  const [currentActionPanelIndex, setCurrentActionPanelIndex] =
    useState<number>(0);

  const actions: Action[] = [
    { label: "パーク前に戻る", fn: () => router.push("/") },
  ];

  const panelActions: PanelAction<"">[] = [
    {
      quote: "あなたのポケモンのステータスです。",
      controllerActions: actions,
      isNextDisable: true,
    },
  ];

  return (
    <div>
      <SceneTitle title="あなたのポケモン" />
      <StatusScreen>
        {local.pokemons.map((pokemon, index) => {
          const bookPokemon = capturePokemons.find((p) => p.id === pokemon.id);
          if (!bookPokemon) return <></>;
          return (
            <Box key={`${pokemon.id}-${index}`}>
              <Grid container sx={{ pb: 1 }} alignItems="center">
                <Typography>No.{pokemon.id}</Typography>
                <Image
                  width="44"
                  height="44"
                  src={
                    bookPokemon.sprites.front_default === ""
                      ? "/images/book_unknown_picture.svg"
                      : bookPokemon.sprites.front_default
                  }
                  alt={`No.${pokemon.id}: ${pokemon.name}`}
                />
                <Typography>{pokemon.name}</Typography>
              </Grid>
            </Box>
          );
        })}
        <Panel
          isDisplay
          actions={panelActions}
          currentActionIndex={currentActionPanelIndex}
          setCurrentActionIndex={setCurrentActionPanelIndex}
        />
      </StatusScreen>
    </div>
  );
}
