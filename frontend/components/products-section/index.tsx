import { CategoryType, ProductType, SerieType } from "types";
import Filter from "./filter";

const ProductsSection: React.FC<{
  products: ProductType[];
  series?: SerieType[];
  categories?: CategoryType[];
}> = ({ products }) => {
  return (
    <section className="flex flex-col laptop:flex-row">
      <Filter />
    </section>
  );
};

export default ProductsSection;
