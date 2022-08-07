import { createContext, useContext, useReducer } from "react";
import { DispatchAction, ModelType, TOrderFeature } from "types";

interface TState {
  features?: TOrderFeature[];
  model?: ModelType;
}

enum TAction {
  UPDATE_FEATURE = "UPDATE_FEATURE",
  CHANGE_MODEL = "CHANGE_MODEL",
  DEFAULT = "DEFAULT",
}

interface TActionType {
  type: TAction;
  id?: string;
  name?: string;
  item?: string;
  model?: ModelType;
}

interface TContext {
  state: TState;
  updateFeature: DispatchAction;
  changeModel: DispatchAction;
}

const reducer: (
  state: TState,
  action: TActionType
) => {
  features?: TOrderFeature[];
  model?: ModelType;
} = (state: TState, action: TActionType) => {
  const updateFeature = () => {
    const noUpdatedFeatures =
      state.features?.length &&
      state.features?.filter((feature) => feature.id !== (action.id as string));
    return {
      ...state,
      features:
        noUpdatedFeatures && noUpdatedFeatures?.length
          ? [
              ...noUpdatedFeatures,
              {
                id: action.id,
                name: action.name,
                item: action.item,
              } as TOrderFeature,
            ]
          : action.id && action.name && action.item
          ? [{ id: action.id, name: action.name, item: action.item }]
          : undefined,
    };
  };

  const changeModel = () => ({
    ...state,
    model: action.model,
  });

  const actions = {
    UPDATE_FEATURE: updateFeature,
    CHANGE_MODEL: changeModel,
    DEFAULT: () => {
      throw new Error("Action doesn't exist");
    },
  };

  return (actions[action.type] || actions["DEFAULT"])();
};

const ProductInfoContext = createContext<TContext | undefined>(undefined);

export const ProductInfoProvider = ({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState: {
    model?: ModelType;
    features?: TOrderFeature[];
  };
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateFeature = ({ id, name, item }: TOrderFeature) =>
    dispatch({ type: TAction.UPDATE_FEATURE, id, name, item });

  const changeModel = ({ model }: { model: ModelType }) =>
    dispatch({ type: TAction.CHANGE_MODEL, model });

  const value = {
    state,
    updateFeature,
    changeModel,
  };

  return (
    <ProductInfoContext.Provider value={value}>
      {children}
    </ProductInfoContext.Provider>
  );
};

export const useProductInfoContext = () => {
  const context = useContext(ProductInfoContext);
  if (!context)
    throw new Error(
      "useProductInfoContext must be used within a ProductInfoProvider"
    );

  return context;
};
