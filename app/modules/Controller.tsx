import { SingleBoxBorder } from "@/pages/_app";
import { Box, Button } from "@mui/material";

export type Action = {
  label: string;
  fn: () => void;
  hidden?: boolean;
};
type Props = {
  actions: Action[];
};
export const Controller: React.FC<Props> = ({ actions }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        width: 148,
        height: "auto",
        bottom: 128,
        right: 24,
        ...SingleBoxBorder,
        p: 1,
      }}
    >
      {actions.map((action, index) => {
        if (action.hidden) {
          return <Box key={index}></Box>;
        }
        return (
          <Box key={index}>
            <Button variant="text" onClick={action.fn}>
              {action.label}
            </Button>
          </Box>
        );
      })}
    </Box>
  );
};
