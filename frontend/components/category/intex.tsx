import ProductsSection from "components/products-section";
import { SerieProvider } from "contexts/serie";
import { CategoryType, ProductType } from "types";
import Header from "./header";

const Category: React.FC<{
  category: CategoryType;
  products: ProductType[];
}> = ({ category, products }) => {
  return (
    <main>
      <Header category={category} />
      <div className="py-12">
        <h1 className="text-center text-5xl">{category.displayName}</h1>
      </div>
      <SerieProvider>
        <ProductsSection
          products={products}
          series={category.series}
          categoryId={category.id}
        />
      </SerieProvider>
    </main>
  );
};

export default Category;
