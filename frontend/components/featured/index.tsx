import FeaturedSlider from "components/slider/featured-slider";
import { FeaturedType } from "types";
import Featured from "./featured";
import { Title } from "./styles";

const Featureds: React.FC<{ featureds?: FeaturedType[] }> = ({ featureds }) => {
  return (
    <section className="">
      <div className="relative py-2 text-center bg-black">
        <Title>featured</Title>
      </div>

      <FeaturedSlider>
        {Array.isArray(featureds) &&
          featureds.length &&
          featureds.map((featured) => (
            <Featured featured={featured}></Featured>
          ))}
      </FeaturedSlider>
    </section>
  );
};

export default Featureds;
