import styled from "styled-components";

export const Button = styled.div.attrs({
  className: `my-4 inline-block px-6 py-2 text-sm font-medium uppercase`,
})<{ color: string; bg: string; border: string }>`
  background-color: ${(props) => props.bg};
  border: 1px solid ${(props) => props.border};
  color: ${(props) => props.color};
`;
