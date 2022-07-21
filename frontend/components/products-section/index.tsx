import { useQuery } from "@apollo/client";
import Products from "components/products";
import { useSerieContext } from "contexts/serie";
import { PRODUCTS_BY_CATEGORY } from "queries";
import { ProductType, SerieType } from "types";
import Filter from "./filter";

const ProductsSection: React.FC<{
  products: ProductType[];
  series?: SerieType[];
  categoryId: string;
}> = ({ products, series, categoryId }) => {
  const serieContext = useSerieContext();

  const { loading, error, data } = useQuery(PRODUCTS_BY_CATEGORY, {
    variables: { categoryId: categoryId, serieId: serieContext?.serieId },
  });

  if (loading) return <h1>LOADING...</h1>;
  if (error) return <h1>Error :(</h1>;

  return (
    <section className="flex flex-col laptop:flex-row">
      <Filter series={series} />
      <Products
        products={serieContext?.serieId ? data?.productsByCategory : products}
      />
    </section>
  );
};

export default ProductsSection;
