import styled from "styled-components";
import { ModelType } from "types";
import { useProductInfoContext } from "./product-info-context";

const Models: React.FC<{ models: ModelType[] }> = ({ models }) => {
  const { state, changeModel } = useProductInfoContext();

  return (
    <div className="text-center lg:text-start mb-8">
      <div className="text-sm font-black tracking-wider text-[0.8em] pb-3">
        <span>Model/Color</span>
      </div>
      <ul className="flex flex-wrap justify-center items-center gap-3 lg:justify-start lg:max-w-[400px]">
        {models.length > 0 &&
          models.map((model) => (
            <LI
              key={model.id}
              selected={
                state.model?.id === model.id ? model.id.toString() : undefined
              }
              onClick={() => changeModel({ model })}
            >
              <figure>
                <img src={model.img} className="w-[60px] h-[60px]" />
              </figure>
            </LI>
          ))}
      </ul>
    </div>
  );
};

const LI = styled.li.attrs<{}>((props) => ({
  ...props,
  className: "cursor-pointer",
}))<{ selected?: string }>`
  border: 2px solid
    ${(props) => (props.selected ? "#000" : props.theme.colors.grey["500"])};
  opacity: ${(props) => (props.selected ? 1 : 0.5)};
  transition: opacity 0.5s, border 0.5s;
`;

export default Models;
