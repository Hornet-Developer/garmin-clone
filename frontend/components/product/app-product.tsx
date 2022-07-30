import { ProductType } from "types";
import CarouselItem from "./carousel-item";
import CarouselScroller from "./carousel-scroller";

const AppProduct: React.FC<{ product: ProductType }> = ({ product }) => {
  return (
    <section className="flex flex-col relative">
      <CarouselScroller>
        {product.imgList?.length &&
          product.imgList.map((url) => <CarouselItem key={url} url={url} />)}
      </CarouselScroller>
    </section>
  );
};

export default AppProduct;
