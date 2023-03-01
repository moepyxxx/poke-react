import { SingleBoxBorder } from "@/pages/_app";
import { Box, Typography } from "@mui/material";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";

type Props = {
  quote: string;
  next?: () => void;
};
export const Quote: React.FC<Props> = ({ quote, next }) => {
  return (
    <Box
      onClick={next}
      sx={{
        position: "absolute",
        width: "calc(100% - 48px)",
        bottom: 24,
        p: 2,
        height: 84,
        zIndex: 1,
        ...SingleBoxBorder,
      }}
    >
      <Typography>{quote}</Typography>
      {next ? (
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
