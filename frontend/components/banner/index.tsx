import OpacitySlider from "components/slider/opacity-slider";
import { BannerType } from "types";
import Banner from "./banner";

const Banners: React.FC<{ banners?: BannerType[] }> = ({ banners }) => {
  return (
    <section className="relative overflow-hidden bg-black">
      <OpacitySlider>
        {banners?.length &&
          banners.map((banner) => <Banner key={banner.id} banner={banner} />)}
      </OpacitySlider>
    </section>
  );
};

export default Banners;
