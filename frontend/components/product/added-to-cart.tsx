import { useQuery } from "@apollo/client";
import { useAuthContext } from "contexts/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { INITIAL_CART } from "queries";
import { useCookies } from "react-cookie";
import { FaCheck } from "react-icons/fa";
import styled from "styled-components";

const AddedToCart: React.FC<{
  name: string;
  imgUrl: string;
  description?: string;
  modelName?: string;
}> = ({ name, imgUrl, description, modelName }) => {
  const router = useRouter();
  const { loggedUser, token } = useAuthContext();
  const [cookies] = useCookies(["cartId"]);

  const { data, error } = useQuery(INITIAL_CART, {
    variables: { cartId: loggedUser?.cartId || cookies.cartId },
    context: {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    },
  });

  const cartId = data?.initialCart?.id || cookies?.cartId;

  return (
    <div className="pt-12 pb-4 border-[1px] border-solid border-grey-300">
      <div className="max-w-[1100px] mx-auto flex flex-wrap flex-auto relative">
        <Link href={`/products/${router.query.id}`}>
          <div className="flex mx-4 w-full md:w-auto cursor-pointer">
            <img
              src={imgUrl}
              className="w-[100px] h-[100px] mr-2.5 self-start cursor-pointer"
            />
            <div>
              <div>
                <div className="flex mb-2.5 font-bold leading-6">
                  <FaCheck size={20} className="mr-2.5" />
                  <h2>Added To Cart</h2>
                </div>
                <div className="ml-8 font-opensans text-sm font-thin tracking-wider md:max-w-xs laptop:max-w-md lg:max-w-lg">
                  {name} {description && `- ${description}`}
                  {modelName && `, ${modelName}`}
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div className="w-full p-4 mt-2 md:w-auto md:absolute md:right-0 md:text-right">
          <Link href={`/products/${router.query.id}`}>
            <Button className="border-[1px] border-solid border-black hover:bg-black hover:text-white mb-4 md:mb-0 md:mr-4">
              Continue Shopping
            </Button>
          </Link>
          <Link href={`/cart/${cartId}`}>
            <Button className="bg-blue-100 border-[1px] border-solid border-blue-100 hover:bg-white">
              View Cart
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Button = styled.div.attrs<{ className?: string }>((props) => ({
  className: `inline-block w-full py-2 px-4 text-center text-sm font-semibold cursor-pointer md:w-auto ${props.className}`,
}))<{ className?: string }>`
  transition: background-color 0.3s ease-in, color 0.3s ease-in;
`;

export default AddedToCart;
