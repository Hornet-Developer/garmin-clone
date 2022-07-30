import { Fragment } from "react";
import { CategoryType, ProductType, SerieType } from "types";
import AppProduct from "./app-product";
import Nav from "./nav";

const Product: React.FC<{
  product: ProductType;
  serie: SerieType;
  category: CategoryType;
}> = ({ product, serie, category }) => {
  return (
    <Fragment>
      <Nav serie={serie} category={category} />
      <AppProduct product={product} />
    </Fragment>
  );
};

export default Product;
