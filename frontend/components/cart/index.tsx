import { CartItemType } from "types";
import Cart from "./cart";

const CartLayout: React.FC<{
  cartItems: CartItemType[];
  formattedSubtotal?: string;
  formattedEstimatedTotal?: string;
}> = ({ cartItems, formattedSubtotal, formattedEstimatedTotal }) => {
  return (
    <div className="flex flex-col gap-10 md:flex-row md:gap-4">
      <div className="w-full p-4">
        {cartItems?.length > 0 &&
          cartItems.map((item) => <Cart key={item.id} cartItem={item} />)}
      </div>
    </div>
  );
};

export default CartLayout;
