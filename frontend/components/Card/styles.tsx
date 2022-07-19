import styled from "styled-components";
import { mq } from "utils/intex";

export const Card = styled.article.attrs({
  className: "flex relative w-auto cursor-pointer tablet:mx-0 tablet:w-2/4",
})`
  box-shadow: 0 2px 4px 1px rgb(0 0 0 / 24%);
`;

export const ImgBgCard = styled.article.attrs<{ index?: number }>((props) => ({
  className: `flex relative cursor-pointer md:flex-1 ${
    props.index && props.index > 2 ? "md:w-full md:flex-none" : "md:basis-3/12"
  } ${props.index === 3 ? "md:mt-4" : ""}`,
}))<{ index?: number }>`
  box-shadow: 0 2px 4px 1px rgb(0 0 0 / 24%);
`;

export const H2: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color,
}) => (
  <h2
    className={`${color ? `text-${color}` : "text-black"} text-2xl font-medium`}
  >
    {children}
  </h2>
);
