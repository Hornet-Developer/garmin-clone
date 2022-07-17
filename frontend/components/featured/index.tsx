import FeaturedSlider from "components/slider/featured-slider";
import { FeaturedType } from "types";
import { Title } from "./styles";

const Featureds: React.FC<{ featureds: FeaturedType[] }> = ({ featureds }) => {
  return (
    <section className="relative ">
      <div className="py-2 text-center bg-black">
        <Title>featured</Title>
      </div>
      <FeaturedSlider>
        {Array.isArray(featureds) &&
          featureds.length &&
          featureds.map((featured) => <></>)}
      </FeaturedSlider>
    </section>
  );
};

export default Featureds;
