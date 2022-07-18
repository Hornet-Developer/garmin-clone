import { IconBaseProps } from "react-icons";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled, { css, ThemedStyledProps } from "styled-components";
import { mq } from "utils/intex";

export const SliderContainer = styled.div.attrs<{ pos: number }>((props) => ({
  ...props,
  className: "relative flex items-stretch gap-6",
}))<{
  pos: number;
  itemWidth: number;
  gap: number;
  numItems: number;
}>`
  @media ${mq.laptop} {
    transform: ${(props) => {
      if (props.pos <= props.numItems - Math.ceil(100 / props.itemWidth)) {
        return `translateX(-${props.itemWidth * props.pos}%)`;
      }
      return `translateX(calc(-${
        props.itemWidth * (props.numItems - Math.ceil(100 / props.itemWidth))
      }% - calc(calc(${props.itemWidth * Math.ceil(100 / props.itemWidth)}% + ${
        props.gap * (props.numItems - 1)
      }px) - 100vw)))`;
    }};
    transition: transform 0.5s ease-out;
  }
`;

export const SliderItem = styled.div<{
  index: number;
  pos: number;
  gap: number;
}>`
  width: 75vw;
  flex: 0 0 auto;
  @media ${mq.xs} {
    width: 38vw;
  }
  @media ${mq.tablet} {
    width: calc(100% / 2.5);
  }
  @media ${mq.laptop} {
    width: calc(100% / 3.5);
  }
`;

const commonDirBtn = css`
  width: 3rem;
  height: 4rem;
  top: 50%;
  transform: translateY(-50%);
  @media ${mq.laptop} {
    display: block;
  }
`;

const commonDirBtnAttrs = (props: ThemedStyledProps<IconBaseProps, any>) => ({
  ...props,
  color: "black",
  className: "absolute hidden bg-grey-200 text-white cursor-pointer",
});

export const BackBtn = styled(IoIosArrowBack).attrs(commonDirBtnAttrs)`
  ${commonDirBtn};
  left: 0;
`;

export const NextBtn = styled(IoIosArrowForward).attrs(commonDirBtnAttrs)`
  ${commonDirBtn};
  right: 0;
`;
