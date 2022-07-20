import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Filter: React.FC<{}> = ({}) => {
  const [isOpen, toggleNav] = useState(false);
  return (
    <div>
      <div className="w-full py-12 px-4 flex justify-between items-center">
        <span className="uppercase font-roboto">filter and sort</span>
        <div className="text-2xl laptop:hidden h-full">
          {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </div>
      </div>
    </div>
  );
};

export default Filter;
