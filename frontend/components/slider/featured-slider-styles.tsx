import styled from "styled-components";

export const SliderContainer = styled.div.attrs<{ pos: number }>((props) => ({
  ...props,
  className: "flex gap-4",
}))<{ pos: number }>`
  /* transform: ${(props) => `translateX(-${80 * props.pos}%)`}; */
`;

export const SliderItem = styled.div.attrs<{
  index: number;
  pos: number;
}>((props) => ({
  className: `${props.index === props.pos ? "opacity-100" : "opacity-0"}`,
}))<{ index: number; pos: number }>`
  width: 80%;
  flex: 0 0 auto;
`;
