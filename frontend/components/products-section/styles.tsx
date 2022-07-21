import styled from "styled-components";

export const ToggleFilterContainer = styled.div.attrs<{
  isopen: string | undefined;
}>((props) => ({
  props,
  className: `w-full py-4 px-4 flex justify-between items-center cursor-pointer ${
    props.isopen ? "pb-0" : ""
  }`,
}))<{ isopen: string | undefined }>`
  border-top: 1px solid ${(props) => props.theme.colors.grey["300"]};
  border-bottom: ${(props) =>
    props.isopen ? null : `1px solid ${props.theme.colors.grey["300"]}`};
`;

export const DropdownBox = styled.div.attrs({
  className: "relative",
})`
  &:after {
    position: absolute;
    width: 0.75rem;
    height: 0.75rem;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 78 48.75' width='24' height='24' xmlns='http://www.w3.org/2000/svg'><path d='M39 27.79L10.73 0 0 10.24l39 38.51 39-38.51L67.28 0z' fill='black'/></svg>");
    background-size: 100%;
    background-repeat: no-repeat;
    pointer-events: none;
    content: "";
  }
`;
