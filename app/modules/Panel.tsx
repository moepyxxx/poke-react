import { Dispatch, SetStateAction, useState } from "react";
import { SelectPanel } from "./SelectPanel";
import { QuotePanel } from "./QuotePanel";
import { ActionEvent, PanelAction } from "@/config/types";
// import { v4 as uuidv4 } from "uuid";

type Props<T, U> = {
  isDisplay: boolean;
  action: PanelAction<T, U> | null;
  setActionEvent: Dispatch<SetStateAction<ActionEvent<T, U> | null>>;
};

export const Panel = <T, U>(props: React.PropsWithChildren<Props<T, U>>) => {
  if (!props.action || !props.isDisplay) return <></>;

  return (
    <>
      {props.action.selectableActions ? (
        <SelectPanel
          actions={props.action.selectableActions}
          setActionEvent={props.setActionEvent}
        />
      ) : (
        <></>
      )}
      <QuotePanel action={props.action} setActionEvent={props.setActionEvent} />
    </>
  );
};
