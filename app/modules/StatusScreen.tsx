import { Box } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const StatusScreen: React.FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        overflow: "scroll",
        position: "absolute",
        top: 24,
        left: "50%",
        transform: "translateX(-50%)",
        height: 480,
        width: "calc(100% - 48px)",
      }}
    >
      {children}
    </Box>
  );
};
