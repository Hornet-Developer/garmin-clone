import { DefaultTheme } from "styled-components";
import colors from "tailwindcss/colors";

const theme: DefaultTheme = {
  screens: {
    tablet: "640px",
    laptop: "990px",
    desktop: "1280px",
  },
  colors: {
    white: colors.white,
    black: colors.black,
    grey: {
      50: colors.neutral["50"],
      100: colors.neutral["100"],
      200: colors.neutral["200"],
      300: colors.neutral["300"],
      400: colors.neutral["400"],
      500: colors.neutral["500"],
      600: colors.neutral["600"],
      700: colors.neutral["700"],
      800: colors.neutral["800"],
      900: colors.neutral["900"],
    },
    blue: {
      50: "#6DCFF6",
      100: "#60cff6",
      200: "#0089d7",
      300: "#0079be",
    },
  },
};

export default theme;
