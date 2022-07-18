import { PodType } from "types";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";

const Pods: React.FC<{ pods?: PodType[] }> = ({ pods }) => {
  return (
    <section className="py-20">
      <Section1 pods={pods?.slice(0, 2)} />
      <Section2 pods={pods?.slice(2, 7)} />
      <Section3 pods={pods?.slice(7, 9)} />
      <Section4 pods={pods?.slice(9)} />
    </section>
  );
};

export default Pods;
