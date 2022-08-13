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

export const Card = styled.article.attrs({
  className: "relative px-6 pt-16 pb-4 w-full h-full cursor-pointer",
})`
  box-shadow: 0 2px 3px 1px ${(props) => props.theme.colors.grey["200"]};
`;

export const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-black text-2xl font-medium ">{children}</h2>
);

export const Subtitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <p className="text-grey-800 text-sm font-roboto font-extralight whitespace-normal">
    {children}
  </p>
);
