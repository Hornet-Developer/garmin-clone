import styled from "styled-components";
import { mq } from "utils";

export const Card = styled.div.attrs({
  className: "p-4 cursor-pointer",
})`
  box-shadow: 0 2px 3px 1px ${(props) => props.theme.colors.grey["200"]};
  @media ${mq.xs} {
    width: calc(50% - 2rem);
  }
  @media ${mq.desktop} {
    width: ${`calc(${100 / 3}% - 2rem)`};
  }
`;
