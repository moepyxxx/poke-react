import { Box } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const Scene: React.FC<Props> = ({ children }) => {
  return <Box>{children}</Box>;
};
