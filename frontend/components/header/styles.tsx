import styled from "styled-components";

export const Container = styled.div.attrs({
  className: "w-full flex flex-col items-stretch",
})``;

export const TopSection = styled.div.attrs({
  className: "px-4",
})``;

export const HamburgerBox = styled.div.attrs((props) => ({
  ...props,
  className:
    "absolute top-0 left-0 cursor-pointer w-6 py-5 md:opocity-0 lg:hidden",
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

export const SearchForm = styled.div.attrs({
  className: "flex px-3 py-4 w-full flex items-center gap-2 focus:outline-1",
})`
  border: 2px solid ${(props) => props.theme.colors.grey["300"]};
  font-family: Roboto;
  &:focus-within {
    border: 2px solid #000;
  }
`;

export const NavItemBox = styled.li.attrs({
  className: "py-5 cursor-pointer",
})`
  border-bottom: 1px solid ${(props) => props.theme.colors.grey["300"]};
`;

export const BottomSection = styled.div.attrs({
  className: "py-2 bg-black text-white px-10",
})`
  font-family: Roboto;
  font-size: 0.8rem;
`;
