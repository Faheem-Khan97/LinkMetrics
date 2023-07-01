import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@components/styles/globals.css";
import { inputTheme } from "@components/theme/input";
import type { AppProps } from "next/app";

export const theme = extendTheme({
  components: {
    Input: inputTheme,
  },
  colors: {
    brand: {
      500: "#000000",
      600: "#444444",
      700: "#666666",
    },
    secondary: {
      400: "#d7a9fc",
      500: "#f1b8fc",
      600: "#ca8dfc",
      700: "#c077fc",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
