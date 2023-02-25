import {
  pokemonBookRangeMax,
  pokemonBookRangeMinAddFirstPokemons,
} from "@/config";
import { PokeAPIPokemon } from "@/config/types";
import { useAppSelector } from "@/hooks";
import { useFetchPokemons } from "@/hooks/useFetchPokemons";
import { Template } from "@/modules/Template";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Status() {
  const router = useRouter();
  const player = useAppSelector((state) => state.player);
  const capturePokemons = useFetchPokemons(
    player.pokemons.map((pokemon) => pokemon.id)
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

  return (
    <Template>
      <div>
        <p>あなたのずかん</p>
        <button onClick={() => router.push("/")}>サファリパーク前に戻る</button>
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
      </div>
    </Template>
  );
}
