import { Children, Fragment, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { useSliderReducer } from "./reducer";
import {
  BackBtn,
  NextBtn,
  SliderContainer,
  SliderItem,
} from "./opacity-slider-styles";

const OpacitySlider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const numItems = Children.count(children);
  const { state, next, previous } = useSliderReducer(numItems);

  useEffect(() => {
    const timerId = setTimeout(() => {
      next();
    }, 5000);
    return () => {
      clearTimeout(timerId);
    };
  }, [state.pos]);

  const handlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: previous,
    trackMouse: true,
  });

  return (
    <Fragment>
      <SliderContainer pos={state.pos} {...handlers}>
        {Children.map(children, (child, index) => (
          <SliderItem index={index} pos={state.pos}>
            {child}
          </SliderItem>
        ))}
      </SliderContainer>
      <BackBtn onClick={previous} />
      <NextBtn onClick={next} />
    </Fragment>
  );
};

export default OpacitySlider;
