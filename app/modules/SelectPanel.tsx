import { zIndex } from "@/config/style";
import { ActionEvent, SelectAction } from "@/config/types";
import { SingleBoxBorder } from "@/pages/_app";
import { Box, Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";

type Props<T, U> = {
  actions: SelectAction<U>[];
  setActionEvent: Dispatch<SetStateAction<ActionEvent<T, U> | null>>;
};

export const SelectPanel = <T, U>(
  props: React.PropsWithChildren<Props<T, U>>
) => {
  const onClickAction = (action: SelectAction<U>) => {
    action.event
      ? props.setActionEvent({
          uuid: uuidv4(),
          event: action.event,
        })
      : "";
  };

  return (
    <Box
      sx={{
        position: "absolute",
        width: 148,
        height: "auto",
        bottom: 100,
        right: 0,
        zIndex: zIndex.panel,
        ...SingleBoxBorder,
        p: 1,
      }}
    >
      {props.actions.map((action, index) => {
        if (action.hidden) {
          return <Box key={index}></Box>;
        }
        return (
          <Box key={index}>
            <Button variant="text" onClick={() => onClickAction(action)}>
              {action.label}
            </Button>
          </Box>
        );
      })}
    </Box>
  );
};
