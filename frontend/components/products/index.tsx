import { ProductType } from "types";
import ProductCard from "./product-card";

const Products: React.FC<{ products: ProductType[] }> = ({ products }) => {
  return (
    <div className="flex flex-col gap-4 pt-8 px-4 xs:px-0 xs:flex-row xs:flex-wrap xs:justify-center">
      {products?.length &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
};

export default Products;
