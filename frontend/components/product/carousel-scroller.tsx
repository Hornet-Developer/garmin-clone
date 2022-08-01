import { Children, Fragment, useCallback } from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import styled from "styled-components";
import { mq } from "utils";
import { useSliderContext } from "./vertical-slider-context";
import { useIntersectionObserver } from "./useIntersectionObserver";
import VerticalSlider from "./vertical-slider";
import VerticalSliderItem from "./vertical-slider-item";

const CarouselScroller: React.FC<{
  children: React.ReactNode;
  imgList: string[];
}> = ({ children, imgList }) => {
  const {
    state: { item },
    numItems,
    prevItem,
    nextItem,
  } = useSliderContext();

  const { isActive, addNode } = useIntersectionObserver(numItems);

  const prevMove = useCallback(() => {
    prevItem();
  }, []);

  const nextMove = useCallback(() => {
    nextItem();
  }, []);

  return (
    <div className="relative my-4 w-full lg:basis-2/4 lg:max-w-[50vw] lg:flex lg:pl-8 lg:gap-10 lg:items-center">
      <VerticalSlider>
        {imgList?.length &&
          imgList.map((url, index) => (
            <VerticalSliderItem key={url} url={url} selected={item === index} />
          ))}
      </VerticalSlider>
      <div className="relative">
        <ul className="relative overflow-auto scroll-smooth w-[100vw] whitespace-nowrap lg:w-[300px] lg:min-h-[300px] lg:overflow-hidden">
          {Children.map(children, (child, index) => (
            <Li
              id={`${index}`}
              ref={addNode}
              isactive={isActive[index] ? isActive.toString() : undefined}
              selected={item === index ? item.toString() : undefined}
            >
              {child}
            </Li>
          ))}
        </ul>
        <div className="invisible w-full lg:visible">
          <div
            className="absolute -left-6 top-2/4 -translate-y-2/4 cursor-pointer"
            onClick={prevMove}
          >
            <MdOutlineArrowBackIos size={30} color="black" />
          </div>
          <div
            className="absolute -right-6 top-2/4 -translate-y-2/4 cursor-pointer"
            onClick={nextMove}
          >
            <MdOutlineArrowForwardIos size={30} color="black" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Li = styled.li.attrs((props: React.ComponentProps<"li">) => ({
  ...props,
  className: "inline-block w-[170px] lg:w-full lg:absolute",
}))<{ isactive: string | undefined; selected: string | undefined }>`
  overflow: visible;
  transition: transform 0.1s;
  &:first-child {
    margin-left: calc(50vw - 100px);
  }
  &:last-child {
    margin-right: calc(50vw - 100px);
  }
  transform: ${(props) => (props.isactive ? "scale(0.95)" : "scale(0.6)")};
  @media ${mq.lg} {
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
    transform: scale(1);
    opacity: ${(props) => (props.selected ? 1 : 0)};
    z-index: ${(props) => (props.selected ? "auto" : -1)};
    transition: opacity 0.5s 0.1s;
  }
`;

export default CarouselScroller;
