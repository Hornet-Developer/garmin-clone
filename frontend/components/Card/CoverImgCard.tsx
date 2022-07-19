import Link from "next/link";
import { PrimaryButton } from "styles/buttons";
import { ItemType } from "types";
import { H2, ImgBgCard } from "./styles";

const CoverImgCard: React.FC<{
  item: ItemType;
  handleClick?: () => void;
  index?: number;
}> = ({ item, handleClick, index }) => {
  return (
    <ImgBgCard index={index}>
      <Link href="/">
        <figure className="relative w-full">
          <img
            src={item.img}
            alt="Product Card"
            className="w-full object-cover min-h-[350px] tablet:max-h-[360px] md:max-h-[360px] lg:max-h-[380px]"
          />
          <div className="linear-gradient-black" />
          <figcaption className="absolute flex flex-col gap-6 text-start bottom-4 pl-6">
            {item.title ? (
              <div className="pr-8">
                <H2 color="white">{item.title}</H2>
              </div>
            ) : item.name ? (
              <div className="pr-8">
                <h2 className="text-white text-2xl tracking-wider uppercase">
                  {item.name}
                </h2>
              </div>
            ) : (
              <></>
            )}
            <div className="">
              <PrimaryButton bg="black" onClick={handleClick}>
                shop
              </PrimaryButton>
            </div>
          </figcaption>
        </figure>
      </Link>
    </ImgBgCard>
  );
};

export default CoverImgCard;
