import FeaturedSlider from "components/slider/featured-slider";
import { FeaturedType } from "types";
import Featured from "./featured";
import { Title } from "./styles";

const Featureds: React.FC<{ featureds?: FeaturedType[]; href?: string }> = ({
  featureds,
  href,
}) => {
  return (
    <section>
      <div className="relative py-2 text-center bg-black">
        <Title>featured</Title>
      </div>

      <FeaturedSlider>
        {featureds?.length &&
          featureds.length > 0 &&
          featureds.map((featured) => (
            <Featured
              key={featured.id}
              featured={featured}
              href={href}
            ></Featured>
          ))}
      </FeaturedSlider>
    </section>
  );
};

export default Featureds;
