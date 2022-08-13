import Link from "next/link";
import { PrimaryButton } from "styles/buttons";
import { ItemType } from "types";
import { Card, H2 } from "./styles";

const SimpleCard: React.FC<{
  item: ItemType;
  handleClick?: () => void;
  href?: string;
}> = ({ item, handleClick, href }) => {
  return (
    <Card>
      <Link href={href || "/"}>
        <figure className="flex flex-col gap-4 pb-4 text-start">
          <img src={item.img} alt="Product Card" />
          <figcaption className="flex flex-col gap-8 h-full">
            <div className="flex-1 pl-4 pr-8">
              <H2>{item.title}</H2>
            </div>
            <div className="px-4 self-end pt-6 flex-1 flex items-end">
              <PrimaryButton bg="white" onClick={handleClick}>
                shop
              </PrimaryButton>
            </div>
          </figcaption>
        </figure>
      </Link>
    </Card>
  );
};

export default SimpleCard;
