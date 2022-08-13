import Link from "next/link";
import { Subtitle, H2 } from "./styles";
import { FeaturedType } from "types";
import { Card } from "./styles";

const Featured: React.FC<{ featured: FeaturedType; href?: string }> = ({
  featured,
  href,
}) => {
  return (
    <Link href={href || "/"}>
      <Card>
        <figure className="flex flex-col gap-8 justify-center text-center">
          <img src={featured?.img} alt="Product featured" />
          <figcaption>
            <H2>{featured.title}</H2>
            <Subtitle>{featured.subtitle}</Subtitle>
          </figcaption>
        </figure>
      </Card>
    </Link>
  );
};

export default Featured;
