import { useAppDispatch, useAppSelector } from "@/hooks";
import { setPlayTimer } from "@/stores/playTimerSlices";
import { useEffect, useState } from "react";

export const Global: React.FC = () => {
  const player = useAppSelector((state) => state.player);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const dispatch = useAppDispatch();

  let timerId: NodeJS.Timer;

  useEffect(() => {
    const timer = () => {
      setElapsedTime((elapsedTime) => elapsedTime + 1);
      dispatch(setPlayTimer(elapsedTime));
    };
    timerId = setInterval(timer, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <>
      <p>{elapsedTime + player.playTime}</p>
    </>
  );
};
