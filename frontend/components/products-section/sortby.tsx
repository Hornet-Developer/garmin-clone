import { memo } from "react";
import { DropDown } from "styles/components";
import { DropdownBox } from "./styles";

const SortBy: React.FC<{ cls: string }> = memo(({ cls }) => {
  return (
    <div className={cls}>
      <label className="text-[0.8rem] font-medium font-roboto laptop:min-w-[30%]">
        <span className="laptop:float-right laptop:text-sm laptop:text-grey-700">
          Sort By
        </span>
      </label>
      <DropdownBox>
        <DropDown>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="date-asc">Date: Old to Recent</option>
          <option value="date-desc">Date: Recent to Old</option>
        </DropDown>
      </DropdownBox>
    </div>
  );
});

export default SortBy;
