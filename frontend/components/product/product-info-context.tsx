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
  feature?: TOrderFeature;
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
      state.features?.filter(
        (feature) => feature.id !== (action.feature?.id as string)
      );
    return {
      ...state,
      features:
        noUpdatedFeatures && noUpdatedFeatures?.length
          ? [...noUpdatedFeatures, action.feature as TOrderFeature]
          : action.feature
          ? [action.feature]
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

  const updateFeature = ({ feature }: { feature: TOrderFeature }) =>
    dispatch({ type: TAction.UPDATE_FEATURE, feature });

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
