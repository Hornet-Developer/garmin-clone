import SimpleCard from "components/card/SimpleCard";
import { PodType } from "types";

const Section1: React.FC<{ pods?: PodType[] }> = ({ pods }) => {
  return (
    <section className="flex flex-col gap-8 px-8 w-auto max-w-screen-xl mx-auto tablet:flex-row pb-10">
      {pods?.length &&
        pods.map((pod) => <SimpleCard key={pod.id} item={pod} />)}
    </section>
  );
};

export default Section1;
