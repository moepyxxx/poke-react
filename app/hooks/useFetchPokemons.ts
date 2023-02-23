import { pokeAPIEndpoint } from "@/config";
import { PokeAPIPokemon } from "@/config/types";
import { useMemo } from "react";
import { useQueries } from "react-query";

const fetchPokemon = async (id: number): Promise<PokeAPIPokemon> => {
  return fetch(pokeAPIEndpoint + "pokemon/" + id).then((res) => res.json());
};

export const useFetchPokemons = (ids: number[]) => {
  const results = useQueries(
    ids.map((id) => {
      return {
        queryKey: ["pokeAPIPokemon", id],
        queryFn: () => fetchPokemon(id),
      };
    })
  );

  const pokemons = useMemo(() => {
    if (!results.every((result) => result.data != null)) return [];

    return results.map((result) => {
      return result.data;
    });
  }, [results]);

  return pokemons;
};
