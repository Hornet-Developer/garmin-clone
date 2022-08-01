import { memo } from "react";

const CarouselItem: React.FC<{ url: string }> = ({ url }) => {
  return (
    <figure className="w-[200px] cursor-pointer lg:w-[300px]">
      <img src={url} className="w-full" />
    </figure>
  );
};

export default memo(CarouselItem);
