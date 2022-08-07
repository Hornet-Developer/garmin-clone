import Link from "next/link";
import { CategoryType, SerieType } from "types";

const Nav: React.FC<{
  serie: SerieType;
  category: CategoryType;
}> = ({ serie, category }) => {
  return (
    <nav className="relative w-full py-4 text-grey-900 font-opensans tracking-widest font-normal uppercase text-[0.95rem]">
      <div className="relative text-center">
        <div className="tablet:inline tablet:px-4 tablet:border-r-[1px] tablet:border-style-solid tablet:border-grey-900 pb-0">
          <Link href={`/categories/${category.id}`}>
            <span className="p-0 cursor-pointer">{category.displayName}</span>
          </Link>
        </div>

        <div className="tablet:inline tablet:px-4">
          <Link href={`/categories/${category.id}/?serieId=${serie.id}`}>
            <span className="p-0 cursor-pointer">{serie.name}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
