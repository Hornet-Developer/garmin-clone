import Products from "components/products";
import { ProductType, SerieType } from "types";
import Filter from "./filter";
import { Container } from "./styles";

const ProductsSection: React.FC<{
  series?: SerieType[];
  products: ProductType[];
}> = ({ series, products }) => {
  return (
    <Container>
      <Filter series={series} />
      <Products products={products} />
    </Container>
  );
};

export default ProductsSection;
