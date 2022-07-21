import { Fragment } from "react";
import { Devide } from "styles/components";
import { SerieType } from "types";
import Series from "./series";
import SortBy from "./sortby";

const FilterContent: React.FC<{ series?: SerieType[]; isOpen: boolean }> = ({
  series,
  isOpen,
}) => {
  return (
    <div className={`${!isOpen ? "hidden" : ""} px-4 tracking-wide`}>
      <SortBy />
      {series?.length && <Series series={series} />}
    </div>
  );
};

export default FilterContent;
