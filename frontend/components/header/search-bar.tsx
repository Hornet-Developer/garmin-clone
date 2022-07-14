import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useToogleNav } from "./context";
import { SearchForm } from "./styles";

const SearchBar = () => {
  const [isDisplay, toggleSearchBar] = useState(false);
  const { isOpen } = useToogleNav();

  return (
    <div className={`${isOpen ? "" : "hidden"} order-last w-full`}>
      <span className={`hidden`}>
        <AiOutlineSearch size="1.4rem" />
      </span>
      <SearchForm>
        <span className="relative">
          <AiOutlineSearch size="1.4rem" />
        </span>
        <input
          type="text"
          className="focus:outline-none placeholder:text-xs placeholder:text-grey-500 text-sm w-[80%]"
          placeholder="Search garmin.com"
        />
      </SearchForm>
    </div>
  );
};

export default SearchBar;
