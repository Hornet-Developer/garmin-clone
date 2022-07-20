import Link from "next/link";
import { CategoryType } from "types";
import { CoverImgsListContainer, HeaderSection, ImgCoverList } from "./styles";

const BannerHeader: React.FC<{ category: CategoryType }> = ({ category }) => {
  return (
    <HeaderSection
      url={category.coverImg}
      className="h-auto lg:min-h-[288px] flex items-center justify-center"
    >
      <h1 className="w-auto max-w-screen-lg mx-8 h-auto text-start py-12 text-white text-[2.5em] leading-tight tracking-wider uppercase">
        {category.title.slice(0, 40)}
      </h1>
    </HeaderSection>
  );
};

const Header: React.FC<{ category: CategoryType }> = ({ category }) => {
  if (category?.coverImgsList?.length)
    return (
      <HeaderSection url={category.coverImg}>
        <h1 className="px-4 py-[1.5em] text-center text-[2.5em] leading-tight tracking-wide uppercase">
          {category.title}
        </h1>
        <CoverImgsListContainer>
          <div className="inline-flex justify-start mb-4">
            {category.coverImgsList?.map((item) => (
              <Link key={item.id} href="/">
                <figure className="flex flex-col gap-4 w-[50vw] px-4 cursor-pointer laptop:w-auto items-center">
                  <ImgCoverList src={item.img} />
                  <figcaption className="flex flex-col gap-4 items-center">
                    <h2 className="uppercase text-2xl tracking-wider">
                      {item.title}
                    </h2>
                    <p className="font-roboto text-center max-w-[210px]">
                      {item.subtitle}
                    </p>
                  </figcaption>
                </figure>
              </Link>
            ))}
          </div>
        </CoverImgsListContainer>
      </HeaderSection>
    );
  return <BannerHeader category={category} />;
};

export default Header;
