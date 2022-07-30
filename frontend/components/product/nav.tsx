import Link from "next/link";
import { CategoryType, SerieType } from "types";

const Nav: React.FC<{
  serie: SerieType;
  category: CategoryType;
}> = ({ serie, category }) => {
  return (
    <nav className="relative w-full py-4 text-grey-900 font-opensans tracking-widest font-normal">
      <div className="relative text-center">
        <div className="mb-2 tablet:mb:0 tablet:inline tablet:px-4 tablet:border-r-[1px] tablet:border-style-solid tablet:border-grey-900">
          <Link href={`/categories/${category.id}`}>
            <span>{category.displayName}</span>
          </Link>
        </div>

        <div className="tablet:inline tablet:px-4">
          <Link href={`/categories/${category.id}/?serieId=${serie.id}`}>
            <span>{serie.name}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
