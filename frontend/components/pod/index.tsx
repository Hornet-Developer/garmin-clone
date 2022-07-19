import { PodType } from "types";
import Section1 from "./Section1";
import Section2 from "./Section2";

const Pods: React.FC<{ pods?: PodType[] }> = ({ pods }) => {
  return (
    <section className="flex flex-col gap-8 py-12 ">
      <Section1 pods={pods?.slice(0, 2)} />
      <Section2 pods={pods?.slice(2, 7)} />
      <Section1 pods={pods?.slice(7, 9)} />
      <Section2 pods={pods?.slice(9)} />
    </section>
  );
};

export default Pods;
