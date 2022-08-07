import CoverImgCard from "components/card/CoverImgCard";
import { PodType } from "types";

const Section2: React.FC<{ pods?: PodType[] }> = ({ pods }) => {
  return (
    <section className="relative flex flex-col gap-4 px-4 md:flex-row md:flex-wrap pb-10">
      {pods?.length &&
        pods.map((pod, index) => (
          <CoverImgCard key={pod.id} index={index} item={pod} />
        ))}
    </section>
  );
};

export default Section2;
