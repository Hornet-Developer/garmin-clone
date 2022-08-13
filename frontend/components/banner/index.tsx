import OpacitySlider from "components/slider/opacity-slider";
import { BannerType } from "types";
import Banner from "./banner";

const Banners: React.FC<{ banners?: BannerType[]; href?: string }> = ({
  banners,
  href,
}) => {
  return (
    <section className="relative overflow-hidden bg-black">
      <OpacitySlider>
        {banners?.length &&
          banners.length > 0 &&
          banners.map((banner) => (
            <Banner key={banner.id} banner={banner} href={href} />
          ))}
      </OpacitySlider>
    </section>
  );
};

export default Banners;
