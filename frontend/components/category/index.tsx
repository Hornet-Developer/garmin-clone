import CoverImgCard from "components/Card/CoverImgCard";
import { CategoryType } from "types";

const Categories: React.FC<{ categories?: CategoryType[] }> = ({
  categories,
}) => {
  return (
    <section className="px-4 pb-10">
      <h2 className="text-center text-2xl tracking-wider py-6">
        SHOP BY CATEGORY
      </h2>
      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
        {categories?.length &&
          categories.map((pod) => (
            <CoverImgCard
              key={pod.id}
              item={{ img: pod.img, name: pod.displayName }}
            />
          ))}
      </div>
    </section>
  );
};

export default Categories;
