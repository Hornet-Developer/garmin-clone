import { useMutation } from "@apollo/client";
import FullScreenLoading from "components/loading/full-screen";
import { useCartItemsCountContext } from "contexts/cartItemsCount";
import { useRouter } from "next/router";
import { UPDATE_CART } from "queries/mutations";
import { memo, useState } from "react";
import { DropDown } from "styles/components";
import { DropdownBox } from "./styles";
import { useAuthContext } from "contexts/auth";

const fillOptions = (quantity: number) =>
  [...new Array(quantity + 10)].map((_, index) => index + 1);

const Quantity: React.FC<{ quantity: number; price: number; itemId: string }> =
  memo(({ quantity, price, itemId }) => {
    const router = useRouter();
    const [selected, setSelected] = useState(quantity);
    const [options, setOptions] = useState(() => fillOptions(quantity));
    const [updateCart, { loading }] = useMutation(UPDATE_CART);
    const { updateQuantity } = useCartItemsCountContext();
    const { token } = useAuthContext();

    const handleChangeQuntity = (
      event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
      const newQuantity = parseInt(event.target.value);

      updateCart({
        variables: {
          cartId: router.query.id,
          item: { itemId, price, quantity: newQuantity },
        },
        context: {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        },
      }).then(() => {
        setSelected(newQuantity);
        updateQuantity({ prevQuantity: selected, newQuantity });
        setOptions(() => fillOptions(newQuantity));
      });
    };

    return (
      <div className="w-28 py-2">
        {loading && <FullScreenLoading />}
        <DropdownBox>
          <DropDown
            className="text-[1.15rem]"
            value={selected}
            onChange={(event) => handleChangeQuntity(event)}
          >
            {options.length > 0 &&
              options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </DropDown>
        </DropdownBox>
      </div>
    );
  });

export default Quantity;
