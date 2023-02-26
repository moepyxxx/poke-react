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

  console.log(local);

  const actions: Action[] = [
    { label: "サファリパーク前に戻る", fn: () => router.push("/") },
  ];

  return (
    <div>
      <SceneTitle title="あなたのポケモン" />
      <Controller actions={actions} />
      <Quote>
        <p>あなたのポケモンのステータスです。</p>
      </Quote>
      <Scene>
        {local.pokemons.map((pokemon, index) => {
          const bookPokemon = capturePokemons.find((p) => p.id === pokemon.id);
          if (!bookPokemon) return <></>;
          return (
            <div key={`${pokemon.id}-${index}`}>
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
      </Scene>
    </div>
  );
}
