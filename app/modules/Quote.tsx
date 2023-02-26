import { SingleBoxBorder } from "@/pages/_app";
import { Box } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const Quote: React.FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "calc(100% - 48px)",
        bottom: 24,
        p: 2,
        height: 84,
        ...SingleBoxBorder,
      }}
    >
      {children}
    </Box>
  );
};
