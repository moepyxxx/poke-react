import { useAppDispatch, useAppSelector } from "@/hooks";
import { setPlayTime, setStartPlayTime } from "@/stores/localDataSlices";
import { setSavePlayTime } from "@/stores/saveSlices";
import { useEffect, useState } from "react";

export const usePlayTime = (): [number, () => void, () => void] => {
  const state = useAppSelector((state) => state);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isStart, setIsStart] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  let timerId: NodeJS.Timer;

  useEffect(() => {
    if (isStart) return;

    dispatch(setStartPlayTime(state.save.playTime));

    const timer = () => {
      setElapsedTime((elapsedTime) => elapsedTime + 1);
    };

    timerId = setInterval(timer, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [isStart]);

  useEffect(() => {
    dispatch(setPlayTime(elapsedTime));
  }, [elapsedTime]);

  const savePlayTime = () => {
    dispatch(setSavePlayTime(state.local.playTime));
    setIsStart(false);
  };

  const gameStart = () => {
    setIsStart(true);
  };

  return [
    state.local.playTime + state.local.setPlayTime,
    savePlayTime,
    gameStart,
  ];
};
