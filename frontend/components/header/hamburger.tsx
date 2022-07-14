import { useToogleNav } from "./context";
import { HamburgerBox, HamburgerItem } from "./styles";

const Hamburger = () => {
  const { isOpen, toggleNav } = useToogleNav();

  return (
    <HamburgerBox onClick={toggleNav}>
      <HamburgerItem isopen={isOpen ? isOpen.toString() : undefined} />
      <HamburgerItem isopen={isOpen ? isOpen.toString() : undefined} />
    </HamburgerBox>
  );
};

export default Hamburger;
