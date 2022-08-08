import { useState } from "react";
import { Fragment } from "react";
import { CategoryType, ProductType, SerieType } from "types";
import AddedToCart from "./added-to-cart";
import Product from "./product";
import { useProductInfoContext } from "./product-info-context";

const ProductMain: React.FC<{
  product: ProductType;
  serie: SerieType;
  category: CategoryType;
}> = ({ product, serie, category }) => {
  const [isAddedToCart, serIsAddedToCart] = useState(false);
  const {
    state: { model },
  } = useProductInfoContext();

  return (
    <Fragment>
      {!isAddedToCart ? (
        <Product
          category={category}
          product={product}
          serie={serie}
          serIsAddedToCart={serIsAddedToCart}
        />
      ) : (
        <AddedToCart
          name={product.name}
          imgUrl={product.imgList[0]}
          description={product.subDescription}
          modelName={model?.color}
        />
      )}
    </Fragment>
  );
};

export default ProductMain;
