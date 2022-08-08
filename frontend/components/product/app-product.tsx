import { ProductType } from "types";
import CarouselItem from "./carousel-item";
import CarouselScroller from "./carousel-scroller";
import ProductInfo from "./product-info";

const AppProduct: React.FC<{
  product: ProductType;
  serIsAddedToCart: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ product, serIsAddedToCart }) => {
  return (
    <section className="relative flex flex-col lg:flex-row lg:pt-4 lg:max-w-[1280px] lg:mx-auto">
      <CarouselScroller imgList={product.imgList}>
        {product.imgList?.length &&
          product.imgList.map((url) => <CarouselItem key={url} url={url} />)}
      </CarouselScroller>
      <ProductInfo product={product} serIsAddedToCart={serIsAddedToCart} />
    </section>
  );
};

export default AppProduct;
