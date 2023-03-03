import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Action, Controller } from "./Controller";
import { Quote } from "./Quote";

export type PanelAction<T> = {
  label?: T;
  quote: string;
  controllerActions?: Action[];
  nextFn?: () => void;
  isNextDisable?: boolean;
};
type Props<T> = {
  actions: PanelAction<T>[];
  currentActionIndex: number;
  setCurrentActionIndex: Dispatch<SetStateAction<number>>;
};
export const Panel = <T,>(props: React.PropsWithChildren<Props<T>>) => {
  const [currentAction, setCurrentAction] = useState<PanelAction<T>>(
    props.actions[0]
  );
  const [isLastAction, setIsLastAction] = useState<boolean>(false);

  useEffect(() => {
    setCurrentAction(props.actions[props.currentActionIndex]);
    if (props.currentActionIndex !== props.actions.length - 1) return;
    setIsLastAction(true);
  }, [props.actions]);

  const changeNextPanelAction = () => {
    if (currentAction.nextFn) {
      currentAction.nextFn();
      return;
    }
    if (isLastAction) return;
    props.setCurrentActionIndex((index) => index + 1);
  };

  if (!currentAction) return <></>;

  return (
    <>
      {currentAction.controllerActions ? (
        <Controller
          actions={currentAction.controllerActions}
          nextAction={
            currentAction.isNextDisable ? undefined : changeNextPanelAction
          }
        />
      ) : (
        <></>
      )}
      <Quote
        quote={currentAction.quote}
        nextAction={
          currentAction.isNextDisable ? undefined : changeNextPanelAction
        }
      />
    </>
  );
};
