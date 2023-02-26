import { parkLocalStorageName } from "@/config";
import { useAppDispatch } from "@/hooks";
import { Park, useLocalStorage } from "@/hooks/useLocalStorage";
import { addPokemons } from "@/stores/localDataSlices";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ParkResult() {
  const [park, setPark] = useLocalStorage<Park>(parkLocalStorageName, null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (park.isStart && park.remainBallCount > 0) {
      router.push("/park");
    }
  }, []);

  const returnToTop = () => {
    dispatch(addPokemons(park.capturePokemons));
    setPark(null);
    router.push("/");
  };

  if (!park) return <></>;

  return (
    <>
      <p>
        おめでとう。あなたはサファリパークでポケモンを
        <span suppressHydrationWarning>{park.capturePokemons.length}</span>
        ひきゲットしました！
      </p>
      {park.capturePokemons.map((pokemon, index) => {
        return (
          <p key={`${index}-${pokemon.id}`} suppressHydrationWarning>
            {pokemon.name}
          </p>
        );
      })}
      {/** TODO: ニックネーム or 逃す */}
      <button onClick={returnToTop}>パーク前に戻る</button>
    </>
  );
}
