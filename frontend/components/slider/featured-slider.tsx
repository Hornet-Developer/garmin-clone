import { useMemo } from "react";
import { Children } from "react";
import {
  BackBtn,
  NextBtn,
  SliderContainer,
  SliderItem,
} from "./featured-slider-styles";
import { useSliderReducer } from "./reducer";

const FeaturedSlider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const numItems = Children.count(children);
  const { state, next, previous } = useSliderReducer(numItems);

  const itemWidth = 100 / 3.5;
  const gap = 24;

  const slideCondition = useMemo(
    () => state.pos <= numItems - Math.ceil(100 / itemWidth),
    [state.pos, numItems, itemWidth]
  );

  return (
    <div className="relative py-10 overflow-x-scroll lg:overflow-x-hidden">
      <SliderContainer
        pos={state.pos}
        numItems={numItems}
        itemWidth={itemWidth}
        gap={gap}
      >
        {Children.map(children, (child, index) => (
          <SliderItem index={index} pos={state.pos} gap={gap}>
            {child}
          </SliderItem>
        ))}
      </SliderContainer>

      {state.pos > 0 && <BackBtn onClick={previous} />}
      {slideCondition && <NextBtn onClick={next} />}
    </div>
  );
};

export default FeaturedSlider;
