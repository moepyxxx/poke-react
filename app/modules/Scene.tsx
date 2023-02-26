import { positionCenter } from "@/pages/_app";
import { Box } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const Scene: React.FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        overflow: "scroll",
        ...positionCenter,
        height: 360,
        width: "calc(100% - 48px)",
      }}
    >
      {children}
    </Box>
  );
};
