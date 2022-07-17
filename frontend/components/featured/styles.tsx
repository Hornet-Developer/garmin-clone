import styled from "styled-components";

export const Title = styled.h2.attrs({
  className: "uppercase text-white",
})`
  &::after {
    content: "";
    z-index: 1;
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -30px;
    border-top: 20px solid #000;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
  }
`;
