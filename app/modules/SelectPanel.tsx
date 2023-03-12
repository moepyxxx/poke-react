import { SingleBoxBorder } from "@/pages/_app";
import { Box, Button } from "@mui/material";

export type Action = {
  label: string;
  fn: () => void;
  hidden?: boolean;
};

type Props = {
  actions: Action[];
  nextAction?: () => void;
};
export const SelectPanel: React.FC<Props> = ({ actions, nextAction }) => {
  const onClickAction = (fn: () => void) => {
    nextAction ? nextAction() : "";
    fn();
  };

  return (
    <Box
      sx={{
        position: "absolute",
        width: 148,
        height: "auto",
        bottom: 100,
        right: 0,
        zIndex: 1,
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
            <Button variant="text" onClick={() => onClickAction(action.fn)}>
              {action.label}
            </Button>
          </Box>
        );
      })}
    </Box>
  );
};
