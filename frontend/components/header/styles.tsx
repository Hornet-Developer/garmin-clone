import styled from "styled-components";
import { mq } from "utils";

export const Container = styled.header.attrs({
  className: "w-full flex flex-col items-stretch",
})``;

export const TopSection = styled.div.attrs({
  className: "px-4 lg:px-0 xl:px-6",
})``;

export const HamburgerBox = styled.div.attrs((props) => ({
  ...props,
  className: "z-10 absolute top-0 left-0 cursor-pointer w-6 py-5 lg:hidden",
}))``;

export const HamburgerItem = styled.div.attrs((props) => ({
  ...props,
  className:
    "absolute bg-black w-11/12 h-0.5 odd:translate-y-[-4px] even:translate-y-[4px]",
}))<{ isopen: string | undefined }>`
  border-radius: 1.5rem;
  transition: all 0.5s ease;
  &:nth-child(1) {
    transform: ${(props) =>
      props.isopen ? "rotate(-45deg)" : "rotate(0) translateY(-4px)"};
  }
  &:nth-child(2) {
    transform: ${(props) =>
      props.isopen ? "rotate(45deg)" : "rotate(0) translateY(4px)"};
  }
`;

export const SearchForm = styled.div.attrs<{ isdisplay: string | undefined }>(
  (props) => ({
    className: `flex px-3 py-4 w-full flex items-center gap-2 focus:outline-1 lg:absolute lg:z-20 lg:bg-white lg:left-0 lg:py-2 ${
      props.isdisplay ? "" : "lg:hidden"
    }`,
  })
)<{ isdisplay: string | undefined }>`
  border: 2px solid ${(props) => props.theme.colors.grey["300"]};
  font-family: Roboto;
  &:focus-within {
    border: 2px solid #000;
  }
`;

export const NavBox = styled.div.attrs<{ isopen: string | undefined }>(
  (props) => ({
    className: `${
      props.isopen
        ? "h-auto min-h-[100vh] absolute top-full bg-white w-[100vw] px-4"
        : "hidden lg:flex"
    } flex flex-col lg:flex-row lg:gap-6 lg:order-last lg:w-full lg:justify-center xl:order-none`,
  })
)<{ isopen: string | undefined }>`
  @media ${mq.lg} {
    border-top: 1px solid ${(props) => props.theme.colors.grey["300"]};
  }
  @media ${mq.xl} {
    border-top: 0;
  }
`;

export const NavItemBox = styled.li.attrs((props) => ({
  ...props,
  className: "py-5 cursor-pointer lg:py-2",
}))`
  border-bottom: 1px solid ${(props) => props.theme.colors.grey["300"]};
  @media ${mq.lg} {
    border-bottom: 0;
  }
`;

export const BottomSection = styled.div.attrs({
  className: "py-2 bg-black text-white px-8 font-roboto",
})`
  font-size: 0.8rem;
  line-height: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.32px;
`;
