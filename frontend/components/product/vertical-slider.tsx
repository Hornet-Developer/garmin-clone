import { Children } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import styled from "styled-components";
import { mq } from "utils";
import { useSliderContext } from "./vertical-slider-context";

const VerticalSlider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    state: { collection },
    prevCollection,
    nextCollection,
    selectItem,
    numCollections,
  } = useSliderContext();

  return (
    <div className="hidden relative w-auto h-full flex flex-col lg:block">
      <SliderBtn
        opacity={collection === 0 ? "opacity-0" : "opacity-100"}
        onClick={() => {
          collection > 0 && prevCollection();
        }}
      >
        <MdOutlineKeyboardArrowUp size={30} color="white" />
      </SliderBtn>
      <div className="w-full h-[360px] overflow-hidden xl:h-[460px]">
        <SliderContainer pos={collection}>
          {Children.map(children, (child, index) => (
            <li onClick={() => selectItem({ selectedItem: index })}>{child}</li>
          ))}
        </SliderContainer>
      </div>
      <SliderBtn
        opacity={
          collection === numCollections - 1 ? "opacity-0" : "opacity-100"
        }
        onClick={() => {
          collection < numCollections - 1 && nextCollection();
        }}
      >
        <MdOutlineKeyboardArrowDown size={30} color="white" />
      </SliderBtn>
    </div>
  );
};

const SliderContainer = styled.ul.attrs({
  className: "w-full flex flex-col",
})<{ pos: number }>`
  transform: ${(props) => `translateY(${-360 * props.pos}px)`};
  transition: transform 0.7s ease-in-out;
  @media ${mq.xl} {
    transform: ${(props) => `translateY(${-460 * props.pos}px)`};
  } ;
`;

const SliderBtn = styled.div.attrs<{ opacity: string }>((props) => ({
  className: `relative w-full h-7 bg-grey-300 flex justify-center items-center cursor-pointer ${props.opacity}`,
}))<{ opacity: string }>`
  transition: opacity 0.2s linear;
`;

export default VerticalSlider;
