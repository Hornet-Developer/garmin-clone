import { memo } from "react";
import styled from "styled-components";

const VerticalSliderItem: React.FC<{ url: string; selected: boolean }> = ({
  url,
  selected,
}) => {
  return (
    <Figure selected={selected ? selected.toString() : undefined}>
      <img src={url} className="w-full" />
    </Figure>
  );
};

const Figure = styled.figure.attrs({
  className: "w-16 h-16 cursor-pointer my-1 xl:w-[84px] xl:h-[84px]",
})<{ selected: string | undefined }>`
  border: 2px solid
    ${(props) => (!props.selected ? props.theme.colors.grey["300"] : "#000")};
  transition: background-color 0.5s, border-color 0.5s, color 0.5s;
`;

export default memo(VerticalSliderItem);
