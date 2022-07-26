import { useToggle } from "hooks/useToggle";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { SerieType } from "types";
import FilterContent from "./filter-content";
import { ToggleFilterContainer } from "./styles";

const Filter: React.FC<{
  series?: SerieType[];
}> = ({ series }) => {
  const { isOpen, toggleHandler } = useToggle();
  return (
    <div className="pb-8 laptop:border-r-[1px] laptop:border-style-solid laptop:border-grey-300">
      <ToggleFilterContainer
        isopen={isOpen ? isOpen.toString() : undefined}
        onClick={toggleHandler}
      >
        <span className="uppercase font-roboto font-bold">filter and sort</span>
        <div className="text-2xl laptop:hidden h-full">
          {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </div>
      </ToggleFilterContainer>
      <FilterContent series={series} isOpen={isOpen} />
    </div>
  );
};

export default Filter;
