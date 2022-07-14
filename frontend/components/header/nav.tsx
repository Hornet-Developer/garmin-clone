import Link from "next/link";
import { CategoryType } from "types/product";
import { useToogleNav } from "./context";
import { NavItemBox } from "./styles";

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
    <ul
      className={`${
        isOpen
          ? "h-auto min-h-[100vh] absolute top-full bg-white w-[100vw] px-4"
          : "hidden"
      } flex flex-col`}
    >
      {Array.isArray(categories) && categories.length ? (
        categories.map((category) => (
          <NavItem key={category.id} category={category} />
        ))
      ) : (
        <></>
      )}
    </ul>
  );
};

export default Nav;
