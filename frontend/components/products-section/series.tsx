import { useSerieContext } from "contexts/serie";
import { useState } from "react";
import { SerieType } from "types";
import { initiateState } from "./helper";

const Series: React.FC<{ series: SerieType[] }> = ({ series }) => {
  const initailState = initiateState(series); //must use useMemo (later)
  const [checked, setChecked] = useState<{ [key: string]: boolean }>(
    initailState
  );
  const serieContext = useSerieContext();

  const handleChange = (id: string) => {
    if (!checked[id]) serieContext.setSerie(id);
    setChecked(() => ({
      ...initailState,
      [id]: !checked[id],
    }));
  };

  return (
    <div className="py-4 border-solid border-grey-300 border-b-[1px]">
      <div className="font-bold text-[0.9rem]">Shop By Serie</div>
      {series.map((serie) => (
        <div
          key={serie.id}
          className="w-full flex justify-between items-center py-2"
        >
          <div className="flex items-center">
            <input
              id={serie.id}
              type="checkbox"
              checked={checked[serie.id]}
              onChange={() => handleChange(serie.id)}
            />
            <label htmlFor={serie.id} className="ml-2">
              {serie.name}
            </label>
          </div>
          <div>
            <span>(0)</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Series;
