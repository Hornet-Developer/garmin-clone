import { useToggle } from "hooks/useToggle";
import { DropDown } from "styles/components";
import { DropdownBox } from "./styles";

const SortBy = () => {
  const { isOpen, toggleHandler } = useToggle();

  return (
    <div>
      <label className="text-[0.8rem] font-medium font-roboto">
        <span>Sort By</span>
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
};

export default SortBy;
