import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Action, Controller } from "./Controller";
import { Quote } from "./Quote";

export type PanelAction<T> = {
  label?: T;
  text: string;
  controllerActions?: Action[];
  nextFn?: () => void;
  isNextDisable?: boolean;
};
type Props<T> = {
  actions: PanelAction<T>[];
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
};
export const Panel = <T,>(props: React.PropsWithChildren<Props<T>>) => {
  const [current, setCurrent] = useState<PanelAction<T>>(
    props.actions[props.currentIndex]
  );
  const [isLast, setIsLast] = useState<boolean>(false);

  useEffect(() => {
    setCurrent(props.actions[props.currentIndex]);

    if (props.currentIndex !== props.actions.length - 1) return;
    setIsLast(true);
  }, [props.currentIndex]);

  const changeNextPanelAction = () => {
    if (current.isNextDisable === true) {
      return;
    }
    current.nextFn ? current.nextFn() : "";

    if (isLast) return;
    props.setCurrentIndex((index) => index + 1);
  };

  return (
    <>
      {current.controllerActions ? (
        <Controller
          actions={current.controllerActions}
          next={changeNextPanelAction}
        />
      ) : (
        <></>
      )}
      <Quote quote={current.text} next={changeNextPanelAction} />
    </>
  );
};
