import { useAppDispatch, useAppSelector } from "@/hooks";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { usePlayTime } from "@/hooks/usePlayTime";
import { setPokemons } from "@/stores/localDataSlices";
import { useRouter } from "next/router";
import { useEffect } from "react";

// TODO: middleware的な処理もついでにしているのでmiddlewareでlocalStorageの参照をできる道を探したい
export const Config: React.FC = () => {
  const [playtime] = usePlayTime();
  const [_, setPark] = useLocalStorage("park", null);
  const router = useRouter();
  const save = useAppSelector((state) => state.save);
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  useEffect(() => {
    // ゲーム開始していない場合は初期化
    if (!save.isGameStart) {
      setPark(null);
      router.push("start");
    }

    dispatch(setPokemons(state.save.pokemons));
  }, []);
  return (
    <>
      <p suppressHydrationWarning>プレイじかん：{playtime}</p>
      <p>
        なまえ：<span suppressHydrationWarning>{save.name}</span>
      </p>
    </>
  );
};
