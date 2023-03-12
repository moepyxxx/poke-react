import { SingleBoxBorder } from "@/pages/_app";
import { Box, Typography } from "@mui/material";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import { animated, useSprings } from "@react-spring/web";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ActionEvent, PanelAction, SelectAction } from "@/config/types";
import { v4 as uuidv4 } from "uuid";
import { zIndex } from "@/config/style";

const to = (i: number) => ({
  opacity: 1,
  delay: i * 50,
});

type Props<T, U> = {
  action: PanelAction<T, U>;
  setActionEvent: Dispatch<SetStateAction<ActionEvent<T, U> | null>>;
};

export const QuotePanel = <T, U>(
  props: React.PropsWithChildren<Props<T, U>>
) => {
  const [styleProps, api] = useSprings(
    props.action.quote.split("").length,
    (i) => ({
      ...to(i),
      from: {
        opacity: 0,
      },
      reset: true,
    })
  );

  // TODO: 出力はコントローラからなので削除
  const onClickAction = () => {
    props.action.nextEvent
      ? props.setActionEvent({
          uuid: uuidv4(),
          event: props.action.nextEvent,
        })
      : "";
  };

  const AnimatedTypography = animated(Typography);

  return (
    <Box
      onClick={onClickAction}
      sx={{
        position: "absolute",
        width: "100%",
        bottom: 0,
        p: 2,
        height: 84,
        zIndex: zIndex.panel,
        ...SingleBoxBorder,
      }}
    >
      {styleProps.map((styleProp, index) => (
        <AnimatedTypography
          sx={{ display: "inline", opacity: 0 }}
          style={styleProp}
        >
          {props.action.quote.split("")[index]}
        </AnimatedTypography>
      ))}
      {props.action.nextEvent ? (
        <ChangeHistoryIcon
          sx={{
            fontSize: 12,
            transform: "rotate(180)",
            position: "absolute",
            bottom: 12,
            right: 12,
          }}
        />
      ) : (
        <></>
      )}
    </Box>
  );
};
