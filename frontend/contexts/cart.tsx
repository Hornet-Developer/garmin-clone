import { useContext, useReducer } from "react";
import { createContext } from "react";
import { DispatchAction } from "types";

export interface TCartItemsId {
  id: string;
}

interface TState {
  cartItemsId: TCartItemsId[] | [];
  count: number;
}

enum TAction {
  ADD = "ADD",
  DELETE = "DELETE",
  DEFAULT = "DEFAULT",
}

interface TActionType {
  type: TAction;
  cartItemId: string;
}

interface TContext {
  state: TState;
  addItem: DispatchAction;
  deleteItem: DispatchAction;
}

const initiateState = (cartItemsId: TCartItemsId[] | [], count: number) => ({
  cartItemsId: cartItemsId || [],
  count: count || 0,
});

const reducer = (state: TState, action: TActionType) => {
  const addItem = () => ({
    ...state,
    cartItemsId:
      state.cartItemsId.length > 0
        ? [{ id: action.cartItemId }, ...state.cartItemsId]
        : [{ id: action.cartItemId }],
    count: state.count + 1,
  });

  const deleteItem = () => ({
    ...state,
    cartItemsId: state.cartItemsId.filter(
      (item) => item.id !== action.cartItemId
    ),
    count: state.count - 1,
  });

  const actions = {
    ADD: addItem,
    DELETE: deleteItem,
    DEFAULT: () => {
      throw new Error("Action doesn't exist");
    },
  };

  return (actions[action.type] || actions["DEFAULT"])();
};

const CartContext = createContext<TContext | undefined>(undefined);

export const CartProvider = ({
  children,
  cartItemsId,
}: {
  children: React.ReactNode;
  cartItemsId: TCartItemsId[] | [];
}) => {
  const [state, dispatch] = useReducer(
    reducer,
    initiateState(cartItemsId, cartItemsId.length || 0)
  );

  const addItem = ({ cartItemId }: { cartItemId: string }) =>
    dispatch({ type: TAction.ADD, cartItemId });

  const deleteItem = ({ cartItemId }: { cartItemId: string }) =>
    dispatch({ type: TAction.ADD, cartItemId });

  const value = {
    state,
    addItem,
    deleteItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within CartProvider");
  }
  return context;
};
