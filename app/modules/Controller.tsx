import { zIndex } from "@/config/style";
import { ActionEvent } from "@/config/types";
import { Box } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";

type Props<T, U> = {
  setActionEvent: Dispatch<SetStateAction<ActionEvent<T, U> | null>>;
};
export const Controller = <T, U>(
  props: React.PropsWithChildren<Props<T, U>>
) => {
  const changeActionEvent = (event: ActionEvent<T, U>["event"]) => {
    props.setActionEvent({
      uuid: uuidv4(),
      event,
    });
  };
  return (
    <Box sx={{ position: "relative", zIndex: zIndex.controller }}>
      <button onClick={() => changeActionEvent("pushLeft")}>left</button>
      <button onClick={() => changeActionEvent("pushRight")}>right</button>
      <button onClick={() => changeActionEvent("pushAbove")}>above</button>
      <button onClick={() => changeActionEvent("pushBelow")}>below</button>
      <button onClick={() => changeActionEvent("pushStart")}>start</button>
      <button onClick={() => changeActionEvent("pushA")}>A</button>
      <button onClick={() => changeActionEvent("pushB")}>B</button>
    </Box>
  );
};
