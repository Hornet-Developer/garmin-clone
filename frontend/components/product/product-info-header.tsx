import { ProductType } from "types";
import { useProductInfoContext } from "./product-info-context";

const Header: React.FC<{ product: ProductType }> = ({ product }) => {
  const {
    state: { model },
  } = useProductInfoContext();
  return (
    <div className="w-full text-center font-opensans antialiased">
      <h1 className="text-[2rem] font-semibold tracking-wider">
        {product.name}
      </h1>
      <h2 className="text-[1.2rem]">
        {model ? model.color : product.subDescription}
      </h2>
      <h3 className="text-xs font-opensans py-3">
        <span className="tracking-widest font-black">PART NUMBER </span>{" "}
        <span>{product.partNumber}</span>
      </h3>
    </div>
  );
};

export default Header;
