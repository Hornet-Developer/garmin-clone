import { compareObjectProps } from "hooks/useDeepMemo";
import { memo } from "react";
import { ProductType } from "types";
import Features from "./product-info-features";
import Models from "./product-info-models";
import Header from "./product-info-header";
import Kicker from "./product-info-kicker";
import ProductPrice from "./product-info-price";
import Action from "./product-info-action";

const ProductInfo: React.FC<{
  product: ProductType;
  serIsAddedToCart: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ product, serIsAddedToCart }) => {
  const prices = Object.freeze({
    price: product.price,
    formattedPrice: product.formattedPrice,
    oldPrice: product.oldPrice,
    formattedOldPrice: product.formattedOldPrice,
    interestFree: product.interestFree,
    formattedInterestFree: product.formattedInterestFree,
  });
  return (
    <div className="m-4 lg:px-12">
      <Header product={product} />
      <Kicker kickers={{ sale: product.sale, new: product.new }} />
      <ProductPrice prices={prices} />
      {product.features && product.features.length > 0 && (
        <Features features={product.features} />
      )}
      {product.models && product.models.length > 0 && (
        <Models models={product.models} />
      )}
      <Action serIsAddedToCart={serIsAddedToCart} />
    </div>
  );
};

export default memo(ProductInfo, compareObjectProps);
