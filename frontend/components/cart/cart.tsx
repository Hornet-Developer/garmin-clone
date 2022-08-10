import { CartItemType } from "types";

const Cart: React.FC<{ cartItem: CartItemType }> = ({ cartItem }) => {
  console.log(cartItem);
  return (
    <article>
      <div className="w-[150px] mr-4 lg:inline-block">
        <img
          src={cartItem?.model?.img}
          alt="Product Image"
          className="w-full"
        />
      </div>
      <h2 className="text-2xl tracking-wide font-bold my-2">{`${
        cartItem.product.name
      }${cartItem?.model ? ", " + cartItem?.model?.color : ""}`}</h2>
      <div className="text-sm tracking-wider">
        {cartItem?.product?.partNumber}
      </div>
      <div></div>
    </article>
  );
};

export default Cart;
