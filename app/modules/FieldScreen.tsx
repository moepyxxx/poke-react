import { Box } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const FieldScreen: React.FC<Props> = ({ children }) => {
  return <Box sx={{ position: "relative" }}>{children}</Box>;
};
