import { Children, Fragment } from "react";
import { SliderContainer, SliderItem } from "./featured-slider-styles";
import { useSliderReducer } from "./reducer";

const FeaturedSlider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const numItems = Children.count(children);
  const { state, next, previous } = useSliderReducer(numItems);

  return (
    <Fragment>
      <SliderContainer pos={state.pos}>
        {Children.map(children, (child, index) => (
          <SliderItem index={index} pos={state.pos}>
            {child}
          </SliderItem>
        ))}
      </SliderContainer>
    </Fragment>
  );
};

export default FeaturedSlider;
