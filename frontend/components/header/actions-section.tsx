import { AiOutlineShoppingCart } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import SearchBar from "./search-bar";

const ActionsSection = () => (
  <div className="flex w-full justify-end flex-wrap">
    <SearchBar />
    <div className="w-8 h-12 text-center flex justify-center items-center">
      <VscAccount size="1.1rem" />
    </div>
    <div className="w-8 h-12 text-center flex justify-center items-center relative">
      <AiOutlineShoppingCart size="1.1rem" />
      <div className="bg-black w-5 h-5 rounded-full absolute left-4 top-1 flex justify-center items-center">
        <span className="text-white text-xs">0</span>
      </div>
    </div>
  </div>
);

export default ActionsSection;
