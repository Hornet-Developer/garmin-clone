import styled from "styled-components";

export const PrimaryButton = styled.button.attrs<{ bg: "white" | "black" }>(
  (props) => ({
    ...props,
    className: `${
      props.bg === "black" ? "text-white" : "text-black"
    } rounded font-roboto uppercase z-10`,
  })
)<{ bg: "white" | "black" }>`
  transition: all 0.5s ease;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid ${(props) => (props.bg === "black" ? "white" : "black")};
  padding: 0.5em 1.5em;
  &:focus-visible {
    outline: -webkit-focus-ring-color auto 1px;
  }
  &:hover {
    background-color: ${(props) => (props.bg === "black" ? "white" : "black")};
    color: ${(props) => props.bg};
  }
`;
