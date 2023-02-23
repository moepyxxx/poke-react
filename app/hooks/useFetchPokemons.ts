import { pokeAPIEndpoint } from "@/config";
import { PokeAPIPokemon } from "@/config/types";
import { parseJPPokemonName } from "@/config/utils";
import { useMemo } from "react";
import { useQueries } from "react-query";

const fetchPokemon = async (id: number): Promise<PokeAPIPokemon> => {
  return fetch(pokeAPIEndpoint + "pokemon/" + id).then((res) => res.json());
};

export const useFetchPokemons = (ids: number[]): PokeAPIPokemon[] => {
  const results = useQueries(
    ids.map((id) => {
      return {
        queryKey: ["pokeAPIPokemon", id],
        queryFn: () => fetchPokemon(id),
      };
    })
  );

  const pokemons: PokeAPIPokemon[] = useMemo(() => {
    if (!results.every((result) => result.data != null)) return [];

    return results
      .map((results) => results.data)
      .filter((data): data is NonNullable<typeof data> => {
        return data != null;
      })
      .map((data) => {
        const pokemon: PokeAPIPokemon = {
          id: data.id,
          name: parseJPPokemonName(data.name),
          sprites: data.sprites,
        };
        return pokemon;
      });
  }, [results]);

  return pokemons;
};
