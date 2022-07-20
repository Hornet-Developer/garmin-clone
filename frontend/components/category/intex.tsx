import ProductsSection from "components/products-section";
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
      <ProductsSection products={products} series={category.series} />
    </main>
  );
};

export default Category;
