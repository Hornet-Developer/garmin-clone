import { compareObjectProps } from "hooks/useDeepMemo";
import { memo } from "react";

interface TKicker {
  sale: boolean | undefined;
  new: boolean | undefined;
}

const Box: React.FC<{ label: string }> = memo(({ label }) => (
  <div className="bg-blue-50 font-roboto font-medium text-xs tracking-widest px-6 py-2">
    <span>{label}</span>
  </div>
));

const Kicker: React.FC<{ kickers: TKicker }> = ({ kickers }) => {
  return (
    <div className="w-full flex flex-col items-center gap-2">
      {kickers.sale && <Box label="Sale" />}
      {kickers.new && <Box label="New" />}
    </div>
  );
};

export default memo(Kicker, compareObjectProps);
