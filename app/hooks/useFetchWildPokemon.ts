import { pokeAPIEndpoint } from "@/config";
import { PokeAPIPokemon } from "@/config/types";
import { parseJPPokemonName, randomPokemonId } from "@/config/utils";
import { useMemo } from "react";
import { useQuery } from "react-query";

const fetchPokemon = async (): Promise<PokeAPIPokemon> => {
  return fetch(pokeAPIEndpoint + "pokemon/" + randomPokemonId()).then((res) =>
    res.json()
  );
};

export const useFetchWildPokemon = (): (() => PokeAPIPokemon) => {
  const result = useQuery({
    queryKey: ["pokeAPIPokemon"],
    queryFn: () => fetchPokemon(),
  });

  const pokemon: PokeAPIPokemon | undefined = useMemo(() => {
    if (!result.data) return;
    return {
      id: result.data.id,
      name: parseJPPokemonName(result.data.name),
      sprites: result.data.sprites,
    };
  }, [result]);

  return () => {
    return pokemon as PokeAPIPokemon;
  };
};
