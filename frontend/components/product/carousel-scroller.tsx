import { Children, useRef } from "react";
import styled from "styled-components";
import { useIntersectionObserver } from "./useIntersectionObserver";

const CarouselScroller: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const numItems = Children.count(children);
  const { isActive, addNode } = useIntersectionObserver(numItems);

  return (
    <div className="relative my-4 w-full">
      <ul className="overflow-auto w-[100vw] whitespace-nowrap">
        {Children.map(children, (child, index) => (
          <Li
            id={`${index}`}
            ref={addNode}
            isactive={isActive[index] ? isActive.toString() : undefined}
          >
            {child}
          </Li>
        ))}
      </ul>
    </div>
  );
};

const Li = styled.li.attrs((props: React.ComponentProps<"li">) => ({
  ...props,
  className: "inline-block w-[170px]",
}))<{ isactive: string | undefined }>`
  overflow: visible;
  transition: transform 0.1s;
  &:first-child {
    margin-left: calc(50vw - 100px);
  }
  &:last-child {
    margin-right: calc(50vw - 100px);
  }
  transform: ${(props) => (props.isactive ? "scale(0.95)" : "scale(0.6)")};
`;

export default CarouselScroller;
