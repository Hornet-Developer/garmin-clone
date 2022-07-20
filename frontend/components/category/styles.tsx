import styled from "styled-components";
import { mq } from "utils";

export const HeaderSection = styled.section.attrs<{ url?: string }>(
  (props) => ({
    ...props,
  })
)<{ url?: string }>`
  background-image: ${(props) => `url(${props.url})`};
  background-position: 50%;
  background-size: cover;
`;

export const CoverImgsListContainer = styled.div.attrs({
  className: "overflow-x-auto mx-auto my-0 text-center scroll-smooth",
})`
  background: linear-gradient(180deg, transparent 40%, #fff 0);
  padding: 0 26vw;
  @media ${mq.laptop} {
    position: relative;
    bottom: -1px;
    padding: 0;
  }
`;

export const ImgCoverList = styled.img.attrs((props) => ({
  ...props,
  className: "w-full laptop:w-auto",
}))`
  max-width: 280px;
  @media ${mq.laptop} {
    max-width: calc(240px - 2rem);
    width: auto;
  }
`;
