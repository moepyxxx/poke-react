import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    text: {
      primary: "#000",
    },
    primary: {
      main: "#000",
    },
    background: {
      default: "#E0E0E0",
      paper: "#fff",
    },
  },
  typography: {
    fontFamily: "DotGothic16",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        ::-webkit-scrollbar{
            width: 10px;
        },
        ::-webkit-scrollbar-corner {
            background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background-color: ${grey[400]};
            border-radius: 4px;
        }
        `,
    },
  },
});
