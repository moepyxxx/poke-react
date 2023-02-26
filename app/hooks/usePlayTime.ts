import { useAppDispatch, useAppSelector } from "@/hooks";
import { addPlayTime } from "@/stores/saveSlices";
import { useEffect, useState } from "react";

export const usePlayTime = (): [number, () => void] => {
  const state = useAppSelector((state) => state);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const dispatch = useAppDispatch();

  let timerId: NodeJS.Timer;

  useEffect(() => {
    const timer = () => {
      setElapsedTime((elapsedTime) => elapsedTime + 1);
    };
    timerId = setInterval(timer, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    setElapsedTime(0);
  }, [state.save.pokemons]);

  const savePlayTime = () => {
    dispatch(addPlayTime(elapsedTime));
  };

  return [elapsedTime + state.save.playTime, savePlayTime];
};
