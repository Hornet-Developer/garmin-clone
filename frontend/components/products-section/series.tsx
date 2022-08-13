import { useSsrLoadingContext } from "contexts/loading";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { SerieType } from "types";
import { initiateState } from "./helper";

const Series: React.FC<{ series: SerieType[] }> = ({ series }) => {
  const router = useRouter();
  const { samePageRef } = useSsrLoadingContext();

  const [checked, setChecked] = useState<{ [key: string]: boolean }>(
    initiateState(series, router.query.serieId as string | undefined)
  );

  const handleChange = useCallback(
    (id: string) => {
      samePageRef.current = true;
      if (!checked[id]) {
        router.push(
          `/categories/${router.query.id}/?serieId=${id}`,
          undefined,
          {
            shallow: true,
          }
        );
      } else {
        router.push(`/categories/${router.query.id}`, undefined, {
          shallow: true,
        });
      }
      setChecked(() => ({
        ...initiateState(series),
        [id]: !checked[id],
      }));
    },
    [samePageRef.current]
  );

  return (
    <div className="py-4 border-solid border-grey-300 border-b-[1px] laptop:border-t-[1px]">
      <div className="font-bold text-[0.9rem]">Shop By Serie</div>
      {series?.length &&
        series?.length > 0 &&
        series.map((serie) => (
          <div
            key={serie.id}
            className="w-full flex justify-between items-center py-2"
          >
            <div className="flex items-center">
              <input
                id={serie.id}
                type="checkbox"
                checked={checked[serie.id] || false}
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
