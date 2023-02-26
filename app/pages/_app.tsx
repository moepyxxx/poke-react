import { Config } from "@/modules/Config";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "../stores/store";
import "@fontsource/dotgothic16";
import { ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/system";
import { CssBaseline } from "@mui/material";
import { theme } from "@/config/muiTheme";

const queryClient = new QueryClient();

export const positionCenter = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const doubleBorder = {
  border: `${theme.palette.text.primary} 4px solid`,
  position: "relative",
  "&::before": {
    height: 588,
    width: 588,
    content: '""',
    background: "transparent",
    border: `${theme.palette.text.primary} 2px solid`,
    zIndex: "-1",
    ...positionCenter,
  },
};

export const SingleBoxBorder = {
  border: `${theme.palette.text.primary} 2px solid`,
  backgroundColor: theme.palette.background.default,
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Container
            sx={{
              width: "100vw",
              height: "100vh",
            }}
          >
            <Container
              sx={{
                width: 600,
                height: 600,
                m: 10,
                padding: 2,
                ...doubleBorder,
              }}
            >
              <Config />
              <Component {...pageProps} />
            </Container>
          </Container>
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
