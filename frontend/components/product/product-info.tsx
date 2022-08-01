import { compareObjectProps } from "hooks/useDeepMemo";
import { memo } from "react";
import { ProductType } from "types";
import Features from "./features";
import Models from "./models";
import Header from "./product-info-header";
import Kicker from "./product-info-kicker";
import ProductPrice from "./product-price";

const ProductInfo: React.FC<{ product: ProductType }> = ({ product }) => {
  const prices = Object.freeze({
    price: product.price,
    formattedPrice: product.formattedPrice,
    oldPrice: product.oldPrice,
    formattedOldPrice: product.formattedOldPrice,
    interestFree: product.interestFree,
    formattedInterestFree: product.formattedInterestFree,
  });
  return (
    <div className="m-4">
      <Header product={product} />
      <Kicker kickers={{ sale: product.sale, new: product.new }} />
      <ProductPrice prices={prices} />
      {product.features && <Features features={product.features} />}
      {product.models && <Models models={product.models} />}
    </div>
  );
};

export default memo(ProductInfo, compareObjectProps);
