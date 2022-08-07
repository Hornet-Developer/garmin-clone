import { compareObjectProps } from "hooks/useDeepMemo";
import { memo } from "react";
import styled from "styled-components";

interface TPrices {
  price?: number;
  formattedPrice: string;
  oldPrice?: number;
  formattedOldPrice?: string;
  interestFree?: number;
  formattedInterestFree?: string;
}

const ProductPrice: React.FC<{ prices: Readonly<TPrices> }> = ({ prices }) => {
  return (
    <div className="w-full text-center my-2 lg:text-start">
      {prices.formattedOldPrice && (
        <LineThrough>
          <span className="relative -top-[1px]">$</span>
          <span>{prices.oldPrice}</span>
          <span className="relative -top-[1px] pl-2 text-[0.6rem]">USD</span>
        </LineThrough>
      )}

      <div className="relative inline-block w-full font-opensans text-blue-300 text-[1.5rem] font-bold tracking-widest">
        <span className="relative text-[.8em] align-top">$</span>
        <span>{prices.price}</span>
        <span className="relative -top-[3px] pl-2 text-[.7em]">USD</span>
      </div>
      {prices.oldPrice && prices.price && (
        <div className="w-full pt-2">
          <div className="text-white inline-block bg-green-50 px-4 py-2 align-baseline tracking-widest">
            <span className="pr-2">Save</span>
            <div className="">
              <span className="relative text-[.8em] align-top">$</span>
              <span>{prices.oldPrice - prices.price}</span>
              <span className="relative -top-[3px] pl-2 text-[.7em]">USD</span>
            </div>
          </div>
        </div>
      )}
      <div className="py-2">
        <p className="text-xs">
          4 interest-free payments of ${prices.interestFree} with{" "}
          <span className="font-extrabold text-sm">Klarna</span>.{" "}
          <span className="underline cursor-pointer">Learn More</span>
        </p>
      </div>
    </div>
  );
};

const LineThrough = styled.div.attrs({
  className: "relative inline-block text-xs font-opensans",
})`
  &:after {
    content: " ";
    display: block;
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: black;
    top: 40%;
  }
`;

export default memo(ProductPrice, compareObjectProps);
