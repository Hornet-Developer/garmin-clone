import { TRefreshQuery } from "pages/cart/[id]";
import { CartItemType } from "types";
import Cart from "./cart";
import SideSection from "./side-section";

const CartLayout: React.FC<{
  cartItems: CartItemType[];
  formattedSubtotal?: string;
  formattedEstimatedTotal?: string;
  refetch: TRefreshQuery;
}> = ({ cartItems, formattedSubtotal, formattedEstimatedTotal, refetch }) => {
  return (
    <div className="flex flex-wrap lg:flex-nowrap lg:items-start max-w-[960px] mx-auto">
      <div className="w-full p-4 text-center lg:w-[70%] lg:px-2">
        {cartItems?.length > 0 &&
          cartItems.map((item) => (
            <Cart key={item.id} cartItem={item} refetch={refetch} />
          ))}
      </div>
      <SideSection
        formattedSubtotal={formattedSubtotal}
        formattedEstimatedTotal={formattedEstimatedTotal}
      />
    </div>
  );
};

export default CartLayout;
