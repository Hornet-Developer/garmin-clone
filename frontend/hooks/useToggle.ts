import { useState } from "react";

export const useToggle = (initialValue?: boolean) => {
  const [isOpen, setToggle] = useState(initialValue || false);

  const toggleHandler = () => setToggle(!isOpen);

  const closeHandler = () => isOpen && setToggle(false);

  const openHandler = () => !isOpen && setToggle(true);

  return { isOpen, toggleHandler, closeHandler, openHandler };
};
