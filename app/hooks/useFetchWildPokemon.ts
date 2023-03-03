import { pokeAPIEndpoint } from "@/config";
import { PokeAPIPokemon } from "@/config/types";
import { randomPokemonId } from "@/config/utils";

// TODO: react-queryにする
const fetchPokemon = async (id: number): Promise<PokeAPIPokemon> => {
  return fetch(pokeAPIEndpoint + "pokemon/" + id).then((res) => res.json());
};

export const useFetchWildPokemon = (): (() => Promise<PokeAPIPokemon>) => {
  return async () => {
    return await fetchPokemon(randomPokemonId());
  };
};
