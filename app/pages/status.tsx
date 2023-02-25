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

  return (
    <Template>
      <div>
        <p>あなたのポケモン</p>
        <button onClick={() => router.push("/")}>サファリパーク前に戻る</button>
        {player.pokemons.map((pokemon) => {
          const bookPokemon = capturePokemons.find((p) => p.id === pokemon.id);
          if (!bookPokemon) return <></>;
          return (
            <div key={pokemon.id}>
              <p>ID: {pokemon.id}</p>
              <p>なまえ：{pokemon.name}</p>
              <p>ニックネーム：{pokemon.nickname}</p>
              {bookPokemon.sprites.front_default === "" ? (
                <></>
              ) : (
                <Image
                  width="100"
                  height="100"
                  src={bookPokemon.sprites.front_default}
                  alt={bookPokemon.name}
                />
              )}
            </div>
          );
        })}
      </div>
    </Template>
  );
}
