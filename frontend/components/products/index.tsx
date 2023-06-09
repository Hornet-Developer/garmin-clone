import { useLazyQuery, useQuery } from "@apollo/client";
import FullScreenLoading from "components/loading/full-screen";
import SortBy from "components/products-section/sortby";
import { useRouter } from "next/router";
import { PRODUCTS_BY_CATEGORY } from "queries";
import { ProductType } from "types";
import ProductCard from "./product-card";

const Products: React.FC<{ products: ProductType[] }> = ({ products }) => {
  const router = useRouter();
  const { query } = router;

  const { loading, error, data } = useQuery(PRODUCTS_BY_CATEGORY, {
    variables: {
      categoryId: query.id as string,
      serieId: query.serieId as string,
    },
    ssr: false,
  });

  return (
    <div className="laptop:flex laptop:flex-col laptop:w-full xs:p-4">
      <SortBy cls="w-[400px] hidden self-end justify-end items-center gap-4 laptop:flex" />
      {error ? (
        <h1 className="w-full text-center text-xl font-extrabold pb-8">
          {error.message}
        </h1>
      ) : (
        <div className="flex flex-col gap-4 pt-8 px-4 xs:px-0 xs:flex-row xs:flex-wrap">
          {(data?.productsByCategory || products)?.length &&
            (data?.productsByCategory || products).length > 0 &&
            (data?.productsByCategory || products).map(
              (product: ProductType) => (
                <ProductCard key={product.id} product={product} />
              ),
            )}
        </div>
      )}
      {loading && <FullScreenLoading />}
    </div>
  );
};

export default Products;
