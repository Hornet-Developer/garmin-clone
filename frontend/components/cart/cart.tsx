import { useMutation } from "@apollo/client";
import FullScreenLoading from "components/loading/full-screen";
import { useCartItemsCountContext } from "contexts/cartItemsCount";
import { useRouter } from "next/router";
import { TRefreshQuery } from "pages/cart/[id]";
import { DELETE_CART_ITEM } from "queries/mutations";
import { useCallback } from "react";
import { MdClose } from "react-icons/md";
import { CartItemType } from "types";
import Quantity from "./quantity";
import { CartBox } from "./styles";
import { useAuthContext } from "contexts/auth";

const Cart: React.FC<{ cartItem: CartItemType; refetch: TRefreshQuery }> = ({
  cartItem,
  refetch,
}) => {
  const { deleteItem } = useCartItemsCountContext();
  const { cartId, token } = useAuthContext();
  const [deleteItemMutation, { loading }] = useMutation(DELETE_CART_ITEM);
  const router = useRouter();

  const handleDelete = useCallback(async (itemId: string) => {
    await deleteItemMutation({
      variables: { itemId, cartId },
      context: {
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : {},
      },
    }).then((response) => {
      deleteItem(response.data?.deletecartItem?.quantity);
      refetch({ cartId: router.query.id });
    });
  }, []);

  return (
    <CartBox>
      {loading && <FullScreenLoading />}
      <div className="relative p-6">
        <MdClose
          className="absolute right-4 top-4 cursor-pointer"
          size={23}
          onClick={() => handleDelete(cartItem.id)}
        />
        <div className="flex flex-col items-center lg:flex-row lg:items-start">
          <div className="w-[150px] mr-4 inline-block">
            <img
              src={cartItem?.model?.img || cartItem.product.imgList[0]}
              alt="Product Image"
              className="w-full"
            />
          </div>
          <div className="text-start max-w-xl lg:max-w-sm">
            <h2 className="text-2xl tracking-wide font-medium my-2">{`${
              cartItem.product.name
            }${cartItem?.model ? ", " + cartItem?.model?.color : ""}`}</h2>
            <div className="text-sm tracking-wider">
              {cartItem?.product?.partNumber}
            </div>
            <div>
              <div className="my-4 text-xl tracking-wider">
                {cartItem.product.formattedPrice}
              </div>
              <Quantity
                quantity={cartItem.quantity}
                price={cartItem.product.price as number}
                itemId={cartItem.id}
              />
              <p className="text-sm tracking-wider mt-4">
                Available to ship in 1-3 business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </CartBox>
  );
};

export default Cart;
