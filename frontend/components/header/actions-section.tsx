import { AiOutlineShoppingCart } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { BsQuestionCircle } from "react-icons/bs";
import SearchBar from "./search-bar";
import { useRef, useState } from "react";
import AccountUtilBar from "./acount-utility-bar";
import { memo } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CART } from "queries/mutations";
import { useAuthContext } from "contexts/auth";
import { useRouter } from "next/router";
import FullScreenLoading from "components/loading/full-screen";
import { useCartItemsCountContext } from "contexts/cartItemsCount";
import { useToggleNav } from "contexts/toggle-nav";
import { useOutsideClick } from "hooks/useOutsideClick";

const ActionsSection = memo(() => {
  const [isDisplay, toggleSearchBar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isOpen: isNavOpen, closeNav } = useToggleNav();
  const { loggedUser, cartId } = useAuthContext();
  const router = useRouter();
  const { cartItemsCount } = useCartItemsCountContext();
  const targetRef = useRef<HTMLDivElement | null>(null);
  const expectedRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(targetRef, expectedRef, () => {
    setIsOpen(false);
  });

  const [fetchOrcreateCart, { loading: createCartLoaing }] =
    useMutation(CREATE_CART);

  const handleCartClick = () => {
    if (loggedUser) {
      if (loggedUser?.cartId) router.push(`/cart/${loggedUser.cartId}`);
      return;
    }
    fetchOrcreateCart({
      variables: { cartId },
    }).then((response) => {
      router.push(`/cart/${response.data.fetchOrcreateCart.id}`);
    });
  };

  return (
    <div
      className="flex w-full justify-end flex-wrap lg:flex-nowrap lg:w-auto relative self-end lg:py-3 lg:mr-4 xl:mx-0"
      onClick={() => {
        isNavOpen && closeNav();
      }}
    >
      {createCartLoaing && <FullScreenLoading />}
      <div className="hidden cursor-pointer lg:flex items-center justify-start h-12 pr-6">
        <div className="flex items-center gap-2">
          <BsQuestionCircle size="1.1rem" />
          <span className="font-roboto text-xs xl:text-[.8rem] self-end">
            Support
          </span>
        </div>
      </div>
      <SearchBar isDisplay={isDisplay} toggleSearchBar={toggleSearchBar} />
      <div className="cursor-pointer w-8 h-12 text-center flex justify-center items-center lg:w-10">
        <div className="inline-block" ref={expectedRef}>
          <VscAccount size="1.1rem" onClick={() => setIsOpen(!isOpen)} />
        </div>
        <AccountUtilBar isOpen={isOpen} setIsOpen={setIsOpen} ref={targetRef} />
      </div>
      <div className="cursor-pointer w-8 h-12 text-center flex justify-center items-center relative lg:w-10">
        <div className="relative" onClick={handleCartClick}>
          <AiOutlineShoppingCart size="1.1rem" />
          <div
            className={`bg-black w-5 h-5 rounded-full absolute left-2 -top-2 flex justify-center items-center ${
              isDisplay ? "hidden" : ""
            }`}
          >
            <span className="text-white text-xs">{cartItemsCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ActionsSection;
