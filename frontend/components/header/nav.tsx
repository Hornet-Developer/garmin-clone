import { useToogleNav } from "contexts/toggle-nav";
import Link from "next/link";
import { CategoryType } from "types";
import { NavBox, NavItemBox } from "./styles";

const NavItem = ({ category }: { category: CategoryType }) => (
  <Link href="/">
    <NavItemBox>
      <span className="uppercase tracking-wide">{category?.displayName}</span>
    </NavItemBox>
  </Link>
);

const Nav = ({ categories }: { categories?: CategoryType[] }) => {
  const { isOpen } = useToogleNav();

  return (
    <NavBox isopen={isOpen ? isOpen.toString() : undefined}>
      {categories?.length ? (
        categories.map((category) => (
          <NavItem key={category.id} category={category} />
        ))
      ) : (
        <></>
      )}
    </NavBox>
  );
};

export default Nav;
