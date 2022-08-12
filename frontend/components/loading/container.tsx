import { Loader } from "./styles";

const ContainerLoading = () => (
  <div className="flex justify-center items-center w-full h-full min-w-[150px] min-h-[150px] z-[99999]">
    <Loader />
  </div>
);

export default ContainerLoading;
