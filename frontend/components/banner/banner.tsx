import Link from "next/link";
import { PrimaryButton } from "styles/buttons";
import { BannerType } from "types";
import { mq, size } from "utils/intex";

const Banner: React.FC<{ banner: BannerType }> = ({ banner }) => {
  return (
    <Link href="/">
      <figure className="m-0 w-full relative">
        <picture className="w-full lg:opacity-70">
          <source media={`(max-width: ${size.sm})`} srcSet={banner.imgM} />
          <source media={`(max-width: ${size.laptop})`} srcSet={banner.imgT} />
          <source media={`${mq.laptop}`} srcSet={banner.imgD} />
          <img src={banner.imgD} alt="cover banner" className="w-full" />
        </picture>
        <figcaption className="text-center pt-10 pb-4 w-auto max-w-5xl px-auto md:pb-10 lg:absolute lg:z-20 lg:top-2/4 lg:-translate-y-2/4 lg:px-20">
          <header className="flex flex-col gap-6 items-center lg:items-start">
            <h1 className="text-white text-2xl font-semibold lg:w-96 lg:text-start lg:text-4xl lg:leading-[100%] lg:tracking-widest">
              {banner.title}
            </h1>
            <p className="text-white text-base font-roboto font-normal lg:w-96 lg:text-start lg:leading-5">
              {banner.subtitle}
            </p>
            <PrimaryButton bg="black">shop</PrimaryButton>
          </header>
        </figcaption>
      </figure>
    </Link>
  );
};

export default Banner;
