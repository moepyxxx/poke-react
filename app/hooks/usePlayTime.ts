import { useAppDispatch, useAppSelector } from "@/hooks";
import { addPlayTime } from "@/stores/saveSlices";
import { useEffect, useState } from "react";

export const usePlayTime = (): [number, () => void, () => void] => {
  const state = useAppSelector((state) => state);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isStart, setStart] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  let timerId: NodeJS.Timer;

  useEffect(() => {
    if (!isStart) return;

    const timer = () => {
      setElapsedTime((elapsedTime) => elapsedTime + 1);
    };
    timerId = setInterval(timer, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [isStart]);

  useEffect(() => {
    setElapsedTime(0);
  }, [state.save.playTime]);

  const savePlayTime = () => {
    dispatch(addPlayTime(elapsedTime));
  };

  const gameStart = () => {
    setStart(true);
  };

  return [elapsedTime + state.save.playTime, savePlayTime, gameStart];
};
