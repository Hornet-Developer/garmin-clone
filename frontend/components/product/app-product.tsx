import { ProductType } from "types";
import CarouselItem from "./carousel-item";
import CarouselScroller from "./carousel-scroller";
import ProductInfo from "./product-info";
import { ProductInfoProvider } from "./product-info-context";

const AppProduct: React.FC<{ product: ProductType }> = ({ product }) => {
  const features = product.features?.map((feature) => ({
    id: feature.id,
    label: feature.items?.[0] as string,
  }));

  return (
    <section className="relative flex flex-col lg:flex-row lg:pt-4 lg:max-w-[1280px] lg:mx-auto">
      <CarouselScroller imgList={product.imgList}>
        {product.imgList?.length &&
          product.imgList.map((url) => <CarouselItem key={url} url={url} />)}
      </CarouselScroller>
      <ProductInfoProvider
        initialState={{ model: product.models?.[0], features }}
      >
        <ProductInfo product={product} />
      </ProductInfoProvider>
    </section>
  );
};

export default AppProduct;
