import { SingleBoxBorder } from "@/pages/_app";
import { Box, Typography } from "@mui/material";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import { animated, useSprings } from "@react-spring/web";
import { useEffect, useState } from "react";

const to = (i: number) => ({
  opacity: 1,
  delay: i * 50,
});

type Props = {
  quote: string;
  nextAction?: () => void;
};
export const QuotePanel: React.FC<Props> = ({ quote, nextAction }) => {
  const [props, api] = useSprings(quote.split("").length, (i) => ({
    ...to(i),
    from: {
      opacity: 0,
    },
    reset: true,
  }));

  const AnimatedTypography = animated(Typography);

  return (
    <Box
      onClick={nextAction}
      sx={{
        position: "absolute",
        width: "100%",
        bottom: 0,
        p: 2,
        height: 84,
        zIndex: 1,
        ...SingleBoxBorder,
      }}
    >
      {props.map((props, index) => (
        <AnimatedTypography
          sx={{ display: "inline", opacity: 0 }}
          style={props}
        >
          {quote.split("")[index]}
        </AnimatedTypography>
      ))}
      {nextAction ? (
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
