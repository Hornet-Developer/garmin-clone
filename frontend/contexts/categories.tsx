import { createContext, useContext, useReducer } from "react";
import { CategoryType } from "types/product";

interface StateType {
  categories: CategoryType[] | null;
}

enum ActionType {
  SET = "SET",
}

interface CategoriesActionType {
  type: ActionType;
  categories: CategoryType[] | null;
}

interface CategoriesContextType {
  state: StateType;
  getCategories: (...args: any) => void;
}

const initialState = () => ({
  categories: null,
});

export default function reducer(
  state: StateType,
  action: CategoriesActionType
): StateType {
  const actions = {
    SET: () => ({
      ...state,
      categories:
        Array.isArray(state.categories) &&
        state.categories.length &&
        Array.isArray(action.categories) &&
        action.categories.length
          ? [...state.categories, ...action.categories]
          : Array.isArray(action.categories) && action.categories.length
          ? action.categories
          : state.categories,
    }),
    DEFAULT: () => {
      throw new Error("Action doesn't correctly provided");
    },
  };

  return (actions[action.type] || actions["DEFAULT"])();
}

export const CategoriesContext = createContext<
  CategoriesContextType | undefined
>(undefined);

export const CategoriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState());

  const value = () => {
    const getCategories = ({ categories }: { categories: CategoryType[] }) =>
      dispatch({ type: ActionType.SET, categories });
    return {
      state: { ...state },
      getCategories,
    };
  };

  return (
    <CategoriesContext.Provider value={value()}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }

  return context;
};
