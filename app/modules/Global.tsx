import { useAppDispatch, useAppSelector } from "@/hooks";
import { usePlayTime } from "@/hooks/usePlayTime";
import { addPokemons } from "@/stores/localDataSlices";
import { useEffect } from "react";

// TODO: middleware的な処理なのでmiddlewareでlocalStorageの参照をできる道を探したい
export const Global: React.FC = () => {
  const [playtime] = usePlayTime();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(addPokemons(state.save.pokemons));
  }, []);
  return (
    <>
      <p suppressHydrationWarning>{playtime}</p>
    </>
  );
};
