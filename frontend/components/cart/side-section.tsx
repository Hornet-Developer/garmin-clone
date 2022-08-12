import { useRouter } from "next/router";
import { memo } from "react";

const SideSection: React.FC<{
  formattedSubtotal?: string;
  formattedEstimatedTotal?: string;
}> = memo(({ formattedSubtotal, formattedEstimatedTotal }) => {
  const router = useRouter();

  return (
    <div className="sticky top-0 w-full p-4 lg:w-[30%] lg:px-2">
      <div className="w-full p-4 bg-grey-100">
        <table className="w-full my-4 border-collapse table-fixed tracking-wide leading-8">
          <tbody>
            <tr>
              <th className="text-start font-medium text-[0.9em] w-[49%]">
                Subtotal
              </th>
              <td className="text-end text-[0.9em] w-[49%]">
                {formattedSubtotal}
              </td>
            </tr>
            <tr>
              <th className="text-start font-medium text-[0.9em] w-[49%]">
                Estimated Total
              </th>
              <td className="text-end text-[0.9em] w-[49%]">
                {formattedEstimatedTotal}
              </td>
            </tr>
          </tbody>
        </table>
        <p className="text-xs my-4 tracking-wide">
          Shipping and tax calculated in checkout
        </p>
        <div className="pt-4">
          <div className="w-full uppercase text-center py-2 bg-blue-100 font-medium text-sm cursor-pointer">
            check out
          </div>
        </div>
      </div>
      <div
        className="w-full py-8 uppercase mb-4 cursor-pointer text-center font-semibold tracking-wider hover:opacity-30"
        onClick={() => {
          router.back();
        }}
      >
        continue shopping
      </div>
    </div>
  );
});

export default SideSection;
