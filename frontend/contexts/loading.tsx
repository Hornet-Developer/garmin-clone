import { createContext, useContext, useRef, useState } from "react";

const SsrLoadingContext = createContext<{
  samePageRef: React.MutableRefObject<boolean>;
}>({ samePageRef: { current: false } });
// const SsrLoadingContext = createContext<{
//   samePage: boolean;
//   setsamePage: React.Dispatch<React.SetStateAction<boolean>>;
// }>({ samePage: false, setsamePage: () => {} });

export const SsrLoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const [samePage, setsamePage] = useState(false);
  const samePageRef = useRef(false);

  const value = {
    samePageRef,
  };

  return (
    <SsrLoadingContext.Provider value={value}>
      {children}
    </SsrLoadingContext.Provider>
  );
};

export const useSsrLoadingContext = () => {
  const context = useContext(SsrLoadingContext);
  if (!context)
    throw new Error(
      "useSsrLoadingContext must be used within SsrLoadingProvider"
    );

  const { samePageRef } = context;

  return { samePageRef };
};
