import { IconBaseProps } from "react-icons";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled, { css, ThemedStyledProps } from "styled-components";
import { mq } from "utils/intex";

export const SliderContainer = styled.div.attrs<{ pos: number }>(
  (props, ref?: React.Ref<HTMLDivElement>) => ({
    ref,
    ...props,
    className: "flex",
  })
)<{ pos: number }>`
  transform: ${(props) => `translateX(-${100 * props.pos}%)`};
`;

export const SliderItem = styled.div.attrs<{
  index: number;
  pos: number;
}>((props) => ({
  className: `${props.index === props.pos ? "opacity-100" : "opacity-0"}`,
}))<{ index: number; pos: number }>`
  width: 100%;
  flex: 0 0 auto;
  transition: opacity 0.5s ease-out;
`;

const commonDirBtn = css`
  top: 19.25vw;
  width: 2rem;
  height: 2rem;
  @media ${mq.md} {
    width: 4rem;
    height: 4rem;
  }
  @media ${mq.lg} {
    top: 50%;
    transform: translateY(-50%);
    width: 3.5rem;
    height: 3.5rem;
  }
`;

const commonDirBtnAttrs = (props: ThemedStyledProps<IconBaseProps, any>) => ({
  ...props,
  className: "absolute text-white cursor-pointer",
});

export const BackBtn = styled(IoIosArrowBack).attrs(commonDirBtnAttrs)`
  ${commonDirBtn};
  left: 0;
`;

export const NextBtn = styled(IoIosArrowForward).attrs(commonDirBtnAttrs)`
  ${commonDirBtn};
  right: 0;
`;
