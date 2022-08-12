import styled from "styled-components";

export const Button = styled.div.attrs({
  className: `my-4 inline-block px-6 py-2 text-sm font-medium uppercase`,
})<{ color: string; bg: string; border: string }>`
  background-color: ${(props) => props.bg};
  border: 1px solid ${(props) => props.border};
  color: ${(props) => props.color};
`;

export const CartBox = styled.article.attrs({
  className: "mb-4",
})`
  border-radius: 3px;
  box-shadow: 0 1px 1px 0 rgba(60, 64, 67, 0.08),
    0 1px 3px 1px rgba(60, 64, 67, 0.16);
  transition: box-shadow 135ms cubic-bezier(0.4, 0, 0.2, 1),
    width 235ms cubic-bezier(0.4, 0, 0.2, 1);
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
