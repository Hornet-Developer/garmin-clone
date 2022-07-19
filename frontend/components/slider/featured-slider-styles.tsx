import { IconBaseProps } from "react-icons";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled, { css, ThemedStyledProps } from "styled-components";
import { mq } from "utils/intex";

export const SliderContainer = styled.div.attrs<{ pos: number }>((props) => ({
  ...props,
  className: "relative flex items-stretch gap-6",
}))<{
  pos: number;
  itemwidths: { tablet: number; desktop: number; gap: number };
  numitems: number;
}>`
  @media ${mq.laptop} {
    transform: ${(props) => {
      if (
        props.pos <=
        props.numitems - Math.ceil(100 / props.itemwidths.tablet)
      ) {
        return `translateX(-${props.itemwidths.tablet * props.pos}%)`;
      }
      return `translateX(calc(-${
        props.itemwidths.tablet *
        (props.numitems - Math.ceil(100 / props.itemwidths.tablet))
      }% - calc(calc(${
        props.itemwidths.tablet * Math.ceil(100 / props.itemwidths.tablet)
      }% + ${props.itemwidths.gap * (props.numitems - 1)}px) - 100vw)))`;
    }};
    transition: transform 0.5s ease-out;
  }
  @media ${mq.desktop} {
    transform: ${(props) => {
      if (
        props.pos <=
        props.numitems - Math.ceil(100 / props.itemwidths.desktop)
      ) {
        return `translateX(-${props.itemwidths.desktop * props.pos}%)`;
      }
      return `translateX(calc(-${
        props.itemwidths.desktop *
        (props.numitems - Math.ceil(100 / props.itemwidths.desktop))
      }% - calc(calc(${
        props.itemwidths.desktop * Math.ceil(100 / props.itemwidths.desktop)
      }% + ${props.itemwidths.gap * (props.numitems - 1)}px) - 100vw)))`;
    }};
    transition: transform 0.5s ease-out;
  }
`;

export const SliderItem = styled.div<{
  index: number;
  pos: number;
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
  @media ${mq.desktop} {
    width: calc(100% / 4.5);
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

export const NextBtn = styled(IoIosArrowForward).attrs(commonDirBtnAttrs)<{
  numitems: number;
  pos: number;
  itemwidths: { tablet: number; desktop: number };
}>`
  ${commonDirBtn};
  right: 0;
  @media ${mq.laptop} {
    display: ${(props) =>
      props.pos <= props.numitems - Math.ceil(100 / props.itemwidths.tablet)
        ? "block"
        : "none"};
  }
  @media ${mq.desktop} {
    display: ${(props) =>
      props.pos <= props.numitems - Math.ceil(100 / props.itemwidths.desktop)
        ? "block"
        : "none"};
  }
`;
