import { createContext, useContext, useState } from "react";

export const SerieContext = createContext<
  | {
      serieId: string | undefined;
      setSerie: React.Dispatch<React.SetStateAction<string | undefined>>;
    }
  | undefined
>(undefined);

export const SerieProvider = ({ children }: { children: React.ReactNode }) => {
  const [serieId, setSerie] = useState<string | undefined>();

  const value = {
    serieId,
    setSerie,
  };

  return (
    <SerieContext.Provider value={value}>{children}</SerieContext.Provider>
  );
};

export const useSerieContext = () => {
  const context = useContext(SerieContext);

  if (!context)
    throw new Error("useSerieContext must be used within a SerieProvider");

  return context;
};
