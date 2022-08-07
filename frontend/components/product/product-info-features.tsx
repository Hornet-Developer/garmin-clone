import { Fragment, useCallback, useState } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import styled, { DefaultTheme, useTheme } from "styled-components";
import { FeatureType } from "types";
import { useProductInfoContext } from "./product-info-context";

type TTheme = { colors?: { [key: string]: string } } & DefaultTheme;

const Features: React.FC<{ features: FeatureType[] }> = ({ features }) => {
  const { state, updateFeature } = useProductInfoContext();
  const theme: TTheme = useTheme();
  const [descriptionOpen, setDescriptionOpen] = useState<{
    [key: string]: boolean;
  }>({});

  const handleDescriptionOpen = (id: string) => {
    setDescriptionOpen((prev) => ({ ...prev, [id]: !descriptionOpen[id] }));
  };

  return (
    <div className="mb-4">
      {features.length !== 0 &&
        features.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col items-center my-2 lg:items-start"
          >
            <div
              className="pb-4 cursor-pointer text-center lg:text-start"
              onClick={() => handleDescriptionOpen(feature.id)}
            >
              <span className="text-sm font-black tracking-wider text-[0.8em]">
                {feature.name}
              </span>
              {feature.description && (
                <Fragment>
                  <div className="relative inline-block ml-2 align-top top-[3px]">
                    <AiFillQuestionCircle
                      size={17}
                      color={theme.colors?.grey["500"]}
                    />
                  </div>
                  {Object.keys(descriptionOpen).length !== 0 &&
                    descriptionOpen[feature.id] && (
                      <div className="mb-4 text-[0.8em] tracking-wider">
                        <p>{feature.description}</p>
                      </div>
                    )}
                </Fragment>
              )}
            </div>
            <div>
              {feature.items &&
                feature.items.map((item, index) => (
                  <FeatureItem
                    key={item}
                    index={index}
                    numItems={feature.items?.length as number}
                    selected={
                      state.features?.some(
                        (featureState) =>
                          featureState.name === feature.name &&
                          featureState.item === item
                      )
                        ? item.toString()
                        : undefined
                    }
                    onClick={() =>
                      updateFeature({
                        id: feature.id,
                        name: feature.name,
                        item,
                      })
                    }
                  >
                    {item}
                  </FeatureItem>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

const FeatureItem = styled.div.attrs<{
  index: number;
  numItems: number;
  selected?: string;
}>((props) => ({
  className: `inline-block uppercase ${
    props.index < props.numItems - 1 ? "mr-3" : ""
  } mb-3 bg-black text-white px-6 py-2 font-opensans text-sm text-center cursor-pointer`,
}))<{
  index: number;
  numItems: number;
  selected?: string;
}>`
  background-color: ${(props) => (props.selected ? "#000" : "#fff")};
  border: 1px solid
    ${(props) => (props.selected ? "#000" : props.theme.colors.grey["300"])};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  transition: background-color 0.5s, color 0.5s, border 0.5s;
`;

export default Features;
