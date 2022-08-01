import styled from "styled-components";
import { FeatureType } from "types";

const Features: React.FC<{ features: FeatureType[] }> = ({ features }) => {
  return (
    <div className="mb-4">
      {features.length !== 0 &&
        features.map((feature) => (
          <div key={feature.id} className="flex flex-col items-center my-2">
            <div className="pb-4">
              <span className="text-sm font-black tracking-wider">
                {feature.name}
              </span>
            </div>
            <div>
              {feature.items &&
                feature.items.map((item, index) => (
                  <div
                    key={item}
                    className={`inline-block uppercase ${
                      index < (feature.items?.length as number) - 1
                        ? "mr-3"
                        : ""
                    } mb-3 bg-black text-white px-6 py-2 font-opensans text-sm text-center`}
                  >
                    {item}
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Features;
