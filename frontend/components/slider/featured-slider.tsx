import { useRef } from "react";
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
  const itemWithRef = useRef({
    tablet: 100 / 3.5,
    desktop: 100 / 4.5,
    gap: 24,
  });

  return (
    <div className="relative py-10 overflow-x-scroll lg:overflow-x-hidden">
      <SliderContainer
        pos={state.pos}
        numitems={numItems}
        itemwidths={itemWithRef.current}
      >
        {Children.map(children, (child, index) => (
          <SliderItem index={index} pos={state.pos}>
            {child}
          </SliderItem>
        ))}
      </SliderContainer>

      {state.pos > 0 && <BackBtn onClick={previous} />}

      <NextBtn
        onClick={next}
        pos={state.pos}
        numitems={numItems}
        itemwidths={itemWithRef.current}
      />
    </div>
  );
};

export default FeaturedSlider;
