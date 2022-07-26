import { SerieType } from "types";
import Series from "./series";
import SortBy from "./sortby";

const FilterContent: React.FC<{
  series?: SerieType[];
  isOpen: boolean;
}> = ({ series, isOpen }) => {
  return (
    <div
      className={`${!isOpen ? "hidden" : ""} px-4 tracking-wide laptop:block`}
    >
      <SortBy cls="laptop:hidden" />
      {series?.length && <Series series={series} />}
    </div>
  );
};

export default FilterContent;
