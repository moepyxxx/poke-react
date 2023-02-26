import {
  pokemonBookRangeMax,
  pokemonBookRangeMinAddFirstPokemons,
} from "@/config";
import { PokeAPIPokemon } from "@/config/types";
import { useAppSelector } from "@/hooks";
import { useFetchPokemons } from "@/hooks/useFetchPokemons";
import { Action, Controller } from "@/modules/Controller";
import { Quote } from "@/modules/Quote";
import { Scene } from "@/modules/Scene";
import { SceneTitle } from "@/modules/SceneTitle";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Status() {
  const router = useRouter();
  const local = useAppSelector((state) => state.local);
  const capturePokemons = useFetchPokemons(
    local.pokemons.map((pokemon) => pokemon.id)
  );

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
            name: "?",
            sprites: {
              back_default: "",
              front_default: "",
            },
          }
    );
  }

  const actions: Action[] = [
    { label: "サファリパーク前に戻る", fn: () => router.push("/") },
  ];

  return (
    <div>
      <SceneTitle title="ポケモンずかん" />
      <Controller actions={actions} />
      <Quote>
        <p>あなたのポケモンずかんです。</p>
      </Quote>
      <Scene>
        {createdBookPokemons.map((pokemon) => {
          return (
            <div key={pokemon.id}>
              <p>ID: {pokemon.id}</p>
              <p>なまえ：{pokemon.name}</p>
              {pokemon.sprites.front_default === "" ? (
                <></>
              ) : (
                <Image
                  width="100"
                  height="100"
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                />
              )}
            </div>
          );
        })}
      </Scene>
    </div>
  );
}
