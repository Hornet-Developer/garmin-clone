import { AiOutlineShoppingCart } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { BsQuestionCircle } from "react-icons/bs";
import SearchBar from "./search-bar";
import { useState } from "react";

const ActionsSection = () => {
  const [isDisplay, toggleSearchBar] = useState(false);

  return (
    <div className="flex w-full justify-end flex-wrap lg:flex-nowrap lg:w-auto relative self-end lg:py-3 lg:mr-4 xl:mx-0">
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
        <VscAccount size="1.1rem" />
      </div>
      <div className="cursor-pointer w-8 h-12 text-center flex justify-center items-center relative lg:w-10">
        <div className="relative">
          <AiOutlineShoppingCart size="1.1rem" />
          <div
            className={`bg-black w-5 h-5 rounded-full absolute left-2 -top-2 flex justify-center items-center ${
              isDisplay ? "hidden" : ""
            }`}
          >
            <span className="text-white text-xs">0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionsSection;
