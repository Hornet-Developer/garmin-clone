import Link from "next/link";
import { ProductType } from "types";
import { Card } from "./styles";

const ProductCard: React.FC<{ product: ProductType }> = ({ product }) => {
  return (
    <Card>
      <Link href={`/products/${product.id}`}>
        <figure className="flex flex-col justify-center items-center">
          <div className="w-52 shrink-0">
            <img src={product.imgList[0]} className="w-full" />
          </div>
          <figcaption className="flex flex-col w-full gap-2">
            <h2 className="text-grey-900 tracking-wider text-xl font-light">
              {product.name}
            </h2>
            <p className="text-sm text-grey-800 font-roboto leading-4">
              {product.description}
            </p>
            <div className="pt-2 font-bold tracking-wide font-roboto">
              {product.formattedPrice}
            </div>
          </figcaption>
        </figure>
      </Link>
    </Card>
  );
};

export default ProductCard;
