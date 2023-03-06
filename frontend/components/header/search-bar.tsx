import { useToggleNav } from "contexts/toggle-nav";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { SearchForm } from "./styles";

const SearchBar = ({
  isDisplay,
  toggleSearchBar,
}: {
  isDisplay: boolean;
  toggleSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isOpen } = useToggleNav();

  return (
    <div
      className={`${
        isOpen ? "" : "hidden lg:flex"
      } order-last w-full lg:order-none lg:w-auto lg:min-w-[2rem] lg:flex lg:justify-center lg:items-center`}
    >
      <div
        className={`hidden ${
          isDisplay ? "lg:hidden" : "lg:flex"
        } w-8 justify-center items-center lg:w-10`}
        onClick={() => toggleSearchBar(!isDisplay)}
      >
        <AiOutlineSearch size="1.4rem" />
      </div>
      <SearchForm isdisplay={isDisplay ? isDisplay.toString() : undefined}>
        <span className="relative">
          <AiOutlineSearch size="1.4rem" />
        </span>
        <input
          type="text"
          className="focus:outline-none placeholder:text-xs placeholder:text-grey-500 text-sm w-[80%]"
          placeholder="Search garmin.com"
        />
        <span
          className="hidden lg:inline lg:relative"
          onClick={() => toggleSearchBar(!isDisplay)}
        >
          <MdOutlineClose size="1.4rem" />
        </span>
      </SearchForm>
    </div>
  );
};

export default SearchBar;
