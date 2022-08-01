import { useMemo } from "react";
import { Fragment } from "react";
import { CategoryType, ProductType, SerieType } from "types";
import AppProduct from "./app-product";
import { SliderProvider } from "./vertical-slider-context";
import Nav from "./nav";

const Product: React.FC<{
  product: ProductType;
  serie: SerieType;
  category: CategoryType;
}> = ({ product, serie, category }) => {
  const numCollections = useMemo(
    () =>
      product.imgList?.length
        ? Math.ceil((product.imgList.length * 64) / 360)
        : 0,
    [product.imgList.length]
  );

  return (
    <Fragment>
      <Nav serie={serie} category={category} />
      <SliderProvider
        numCollections={numCollections}
        numCollectionItems={5}
        numItems={product.imgList?.length || 0}
      >
        <AppProduct product={product} />
      </SliderProvider>
    </Fragment>
  );
};

export default Product;
