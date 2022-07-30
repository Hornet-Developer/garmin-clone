const CarouselItem: React.FC<{ url: string }> = ({ url }) => {
  return (
    <figure className="w-[200px] cursor-pointer">
      <img src={url} className="w-full" />
    </figure>
  );
};

export default CarouselItem;
