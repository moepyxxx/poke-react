import { useAppSelector } from "@/hooks";
import { useFetchPokemons } from "@/hooks/useFetchPokemons";
import { Template } from "@/modules/Template";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Status() {
  const router = useRouter();
  const save = useAppSelector((state) => state.save);
  const capturePokemons = useFetchPokemons(
    save.pokemons.map((pokemon) => pokemon.id)
  );

  return (
    <Template>
      <div>
        <p>あなたのポケモン</p>
        <button onClick={() => router.push("/")}>サファリパーク前に戻る</button>
        {save.pokemons.map((pokemon) => {
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
