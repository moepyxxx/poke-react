import { pokemonBookRangeMax, pokemonBookRangeMin } from ".";
import { FieldPath } from "./types";

export const parseJPPokemonName = (name: string): string => {
  switch (name) {
    case "chikorita":
      return "チコリータ";
    case "cyndaquil":
      return "ヒノアラシ";
    case "totodile":
      return "ワニノコ";
    default:
      return name;
  }
};

export const parseFieldName = (path: FieldPath): string => {
  switch (path) {
    case "kusamura":
      return "くさむら";
    default:
      return "";
  }
};

export const randomResult = (probably: number): boolean => {
  const max = 10;
  const min = 1;
  const random = Math.floor(Math.random() * (max + 1 - min)) + min;
  return random > probably;
};

export const randomPokemonId = (): number => {
  const max = pokemonBookRangeMax;
  const min = pokemonBookRangeMin;
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};
