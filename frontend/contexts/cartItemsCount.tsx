import { useCallback } from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { DispatchAction } from "types";

interface TContext {
  cartItemsCount: number;
  addItem: DispatchAction;
  deleteItem: DispatchAction;
  updateQuantity: DispatchAction;
  setQuantity: DispatchAction;
  reset: DispatchAction;
}

const CartItemsCountContext = createContext<TContext | undefined>(undefined);

export const CartItemsCountProvider = ({
  children,
  initialCount,
}: {
  children: React.ReactNode;
  initialCount: number;
}) => {
  const [cartItemsCount, setCartItemsCount] = useState(() => initialCount || 0);

  const addItem = () => {
    setCartItemsCount((prevState) => prevState + 1);
  };

  const deleteItem = (quantity: number) => {
    setCartItemsCount((prevState) => prevState - quantity);
  };

  const updateQuantity = ({
    prevQuantity,
    newQuantity,
  }: {
    prevQuantity: number;
    newQuantity: number;
  }) => {
    setCartItemsCount((prevState) => prevState - prevQuantity + newQuantity);
  };

  const setQuantity = (quantity: number) => {
    setCartItemsCount(quantity);
  };

  const reset = () => {
    setCartItemsCount(0);
  };

  const value = {
    cartItemsCount,
    addItem,
    deleteItem,
    updateQuantity,
    setQuantity,
    reset,
  };

  return (
    <CartItemsCountContext.Provider value={value}>
      {children}
    </CartItemsCountContext.Provider>
  );
};

export const useCartItemsCountContext = () => {
  const context = useContext(CartItemsCountContext);
  if (!context) {
    throw new Error(
      "useCartItemsCountContext must be used within CartItemsCountProvider"
    );
  }
  return context;
};
