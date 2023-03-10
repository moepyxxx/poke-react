import {
  pokemonBookRangeMax,
  pokemonBookRangeMinAddFirstPokemons,
} from "@/config";
import { PanelAction, PokeAPIPokemon, SelectAction } from "@/config/types";
import { useAppSelector } from "@/hooks";
import { useFetchPokemons } from "@/hooks/useFetchPokemons";
import { Panel } from "@/modules/Panel";
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

  const createdBookPokemons: PokeAPIPokemon[] = [];
  for (
    let id = pokemonBookRangeMinAddFirstPokemons;
    id <= pokemonBookRangeMax;
    id++
  ) {
    const findPokemon = capturePokemons.find((pokemon) => pokemon.id === id);
    createdBookPokemons.push(
      findPokemon
        ? findPokemon
        : {
            id,
            name: "???",
            sprites: {
              back_default: "",
              front_default: "",
            },
          }
    );
  }

  const actions: SelectAction[] = [
    {
      label: "パーク前に戻る",
      fn: () => router.push("/field/in_front_of_safari_park"),
    },
  ];

  const panelActions: PanelAction<"">[] = [
    {
      quote: "あなたのポケモンずかんです。",
      selectableActions: actions,
      isNextDisable: true,
    },
  ];

  return (
    <>
      <SceneTitle title="ポケモンずかん" />
      <StatusScreen>
        {createdBookPokemons.map((pokemon) => {
          return (
            <Box key={pokemon.id}>
              <Grid container sx={{ pb: 1 }} alignItems="center">
                <Typography>No.{pokemon.id}</Typography>
                <Image
                  width="44"
                  height="44"
                  src={
                    pokemon.sprites.front_default === ""
                      ? "/images/book_unknown_picture.svg"
                      : pokemon.sprites.front_default
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
    </>
  );
}
