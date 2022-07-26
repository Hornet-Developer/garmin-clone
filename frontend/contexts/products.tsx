import { LazyQueryExecFunction, useLazyQuery } from "@apollo/client";
import { PRODUCTS_BY_CATEGORY } from "queries";
import { createContext, useContext, useState } from "react";
import { ProductType } from "types";

interface TState {
  products: ProductType[];
  loading: boolean;
  called: boolean;
  error: string | undefined;
}

interface TContext {
  state: TState;
  filterProducts: LazyQueryExecFunction<
    any,
    {
      categoryId?: string | undefined;
      serieId?: string | undefined;
    }
  >;
}

export const ProductsContext = createContext<TContext | undefined>(undefined);

export const ProductsProvider = ({
  children,
  products,
}: {
  children: React.ReactNode;
  products: ProductType[];
}) => {
  const [filterProducts, { called, loading, error, data }] = useLazyQuery(
    PRODUCTS_BY_CATEGORY,
    {
      ssr: false,
    }
  );

  const value = {
    state: {
      products: data?.productsByCategory || products,
      loading: loading || false,
      error: error?.message,
      called: called || false,
    },
    filterProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);

  if (!context)
    throw new Error(
      "useProductsContext must be used within a ProductsProvider"
    );

  return context;
};
