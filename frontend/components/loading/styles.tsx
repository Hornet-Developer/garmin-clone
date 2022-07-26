import styled, { keyframes } from "styled-components";

export const FullScreen = styled.div.attrs({
  className:
    "fixed w-[100vw] h-[100vh] flex justify-center items-center left-0 top-0",
})`
  background-color: rgba(0, 0, 0, 0.2);
`;

export const Loader = () => (
  <div className="flex justify-center items-center gap-2">
    <Cycle from="0" to="33" />
    <Cycle from="34" to="66" />
    <Cycle from="67" to="100" />
  </div>
);

const flickering = (
  colors: { [key: string]: string },
  from: string,
  to: string
) => {
  return keyframes`
  ${from}% {
    background-color: ${colors.blue["100"]};
    transform: scale(0.9)
  }
  ${to}% {
    background-color: ${colors.blue["200"]};
  }
`;
};

export const Cycle = styled.div.attrs({
  className: "w-14 h-14 rounded-full",
})<{ from: string; to: string }>`
  animation: ${(props) => flickering(props.theme.colors, props.from, props.to)}
    1s ease-in infinite;
`;
