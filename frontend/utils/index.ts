import { TMatches } from "contexts/breakpoint";

export const size = {
  xs: "480px",
  tablet: "540px",
  sm: "640px",
  md: "768px",
  laptop: "990px",
  lg: "1024px",
  xl: "1280px",
  desktop: "1280px",
  "2xl": "1536px",
};

export const mq = {
  xs: `(min-width: ${size.xs})`,
  tablet: `(min-width: ${size.tablet})`,
  sm: `(min-width: ${size.sm})`,
  md: `(min-width: ${size.md})`,
  laptop: `(min-width: ${size.laptop})`,
  lg: `(min-width: ${size.lg})`,
  xl: `(min-width: ${size.xl})`,
  desktop: `(min-width: ${size.desktop})`,
  "2xl": `(min-width: ${size["2xl"]})`,
};

const initiateMQState = (mq: { [key: string]: string }) =>
  Object.entries(mq).reduce((acc: TMatches, next) => {
    acc[next[0]] = false;
    return acc;
  }, {});

export const initialMQState = initiateMQState(mq);
