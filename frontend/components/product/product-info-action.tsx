import { useMutation } from "@apollo/client";
import { useAuthContext } from "contexts/auth";
import { useRouter } from "next/router";
import { ADD_TO_CART } from "queries/mutations";
import styled from "styled-components";
import { useProductInfoContext } from "./product-info-context";
import FullScreenLoading from "components/loading/full-screen";
import { useCartItemsCountContext } from "contexts/cartItemsCount";

const Action: React.FC<{
  serIsAddedToCart: React.Dispatch<React.SetStateAction<boolean>>;
  price: number;
}> = ({ serIsAddedToCart, price }) => {
  const { token } = useAuthContext();
  const { addItem } = useCartItemsCountContext();

  const {
    state: { model, features },
  } = useProductInfoContext();

  const router = useRouter();
  const productId = router.query.id;

  const [addProductToCart, { loading }] = useMutation<{
    addItemToCart: { id: string; [key: string]: any };
  }>(ADD_TO_CART);

  const handleClick = () => {
    addProductToCart({
      variables: {
        price,
        item: {
          productId,
          modelId: model?.id,
          features: features?.map((feature) => ({
            name: feature.name,
            item: feature.item,
          })),
        },
      },
      context: {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      },
    })
      .then(() => {
        addItem();
        serIsAddedToCart(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="font-opensans">
      {loading && <FullScreenLoading />}
      <div className="text-center lg:text-start py-2">
        <Button
          onClick={handleClick}
          loading={loading ? loading.toString() : undefined}
        >
          ADD TO CART
        </Button>
      </div>
      <div className="text-center lg:text-start py-2">
        <p className="text-lg">Available to ship in 2&ndash;3 weeks.</p>
      </div>
    </div>
  );
};

const Button = styled.button.attrs({
  className:
    "px-9 py-3 bg-blue-300 max-w-[80%] tracking-widest text-white font-black text-sm lg:px-12 lg:py-4",
})<{ loading?: string | undefined }>`
  &:hover {
    background-color: ${(props) => props.theme.colors.blue["200"]};
  }
  &:active {
    background-color: ${(props) => props.theme.colors.blue["300"]};
  }
  transition: background 0.2s ease-in-out, color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  opacity: ${(props) => (props.loading ? 0.2 : 1)};
  cursor: ${(props) => (props.loading ? "wait" : "pointer")};
  transition: opacity 0.3s;
`;

export default Action;
