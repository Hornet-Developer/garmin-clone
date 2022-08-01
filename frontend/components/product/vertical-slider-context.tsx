import { createContext, useContext, useReducer } from "react";
import { DispatchAction } from "types";

interface TState {
  collection: number;
  item: number;
}

enum TActionType {
  PREV_COLLECTION = "PREV_COLLECTION",
  NEXT_COLLECTION = "NEXT_COLLECTION",
  SELECT_ITEM = "SELECT_ITEM",
  PREV_ITEM = "PREV_ITEM",
  NEXT_ITEM = "NEXT_ITEM",
  DEFAULT = "DEFAULT",
}

interface TAction {
  type: TActionType;
  numCollections?: number;
  numCollectionItems?: number;
  numItems?: number;
  selectedItem?: number;
}

interface TContext {
  state: TState;
  numCollections: number;
  numCollectionItems: number;
  numItems: number;
  prevCollection: DispatchAction;
  nextCollection: DispatchAction;
  selectItem: DispatchAction;
  prevItem: DispatchAction;
  nextItem: DispatchAction;
}

const initialState = () => ({
  collection: 0,
  item: 0,
});

const reducer = (state: TState, action: TAction) => {
  const prevCollection = () => ({
    ...state,
    collection: state.collection > 0 ? state.collection - 1 : state.collection,
  });

  const nextCollection = () => ({
    ...state,
    collection:
      state.collection < (action.numCollections as number) - 1
        ? state.collection + 1
        : state.collection,
  });

  const selectItem = () => ({
    ...state,
    item: action.selectedItem as number,
  });

  const prevItem = () => ({
    ...state,
    item: state.item > 0 ? state.item - 1 : (action.numItems as number) - 1,
    collection:
      state.item === 0
        ? (action.numCollections as number) - 1
        : Math.floor((state.item - 1) / (action.numCollectionItems as number)),
  });

  const nextItem = () => ({
    ...state,
    item: (state.item + 1) % (action.numItems as number),
    collection: Math.floor(
      ((state.item + 1) % (action.numItems as number)) /
        (action.numCollectionItems as number)
    ),
  });

  const actions = {
    PREV_COLLECTION: prevCollection,
    NEXT_COLLECTION: nextCollection,
    SELECT_ITEM: selectItem,
    PREV_ITEM: prevItem,
    NEXT_ITEM: nextItem,
    DEFAULT: () => {
      throw new Error("Action doesn't exist");
    },
  };

  return (actions[action.type] || actions["DEFAULT"])();
};

const SliderContext = createContext<TContext | undefined>(undefined);

export const SliderProvider = ({
  children,
  numCollections,
  numCollectionItems,
  numItems,
}: {
  children: React.ReactNode;
  numCollections: number;
  numCollectionItems: number;
  numItems: number;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState());

  const prevCollection = () => dispatch({ type: TActionType.PREV_COLLECTION });

  const nextCollection = () =>
    dispatch({ type: TActionType.NEXT_COLLECTION, numCollections });

  const selectItem = ({ selectedItem }: { selectedItem: number }) =>
    dispatch({ type: TActionType.SELECT_ITEM, selectedItem });

  const prevItem = () =>
    dispatch({
      type: TActionType.PREV_ITEM,
      numItems,
      numCollections,
      numCollectionItems,
    });

  const nextItem = () =>
    dispatch({ type: TActionType.NEXT_ITEM, numItems, numCollectionItems });

  const value = {
    state,
    numCollections,
    numItems,
    numCollectionItems,
    prevCollection,
    nextCollection,
    selectItem,
    prevItem,
    nextItem,
  };

  return (
    <SliderContext.Provider value={value}>{children}</SliderContext.Provider>
  );
};

export const useSliderContext = () => {
  const context = useContext(SliderContext);

  if (!context)
    throw new Error("useSliderContext must be used within a SliderProvider");

  return context;
};
