import { useCallback, useReducer } from "react";

interface StateType {
  pos: number;
}

enum ActionType {
  PREV = "PREV",
  NEXT = "NEXT",
  DEFAULT = "DEFAULT",
}

interface Action {
  type: ActionType;
  numItems: number;
}

export function reducer(state: StateType, action: Action) {
  const next = () => ({
    ...state,
    pos: (state.pos + 1) % action.numItems,
  });

  const previous = () => ({
    ...state,
    pos: state.pos === 0 ? action.numItems - 1 : state.pos - 1,
  });

  const actions = {
    PREV: previous,
    NEXT: next,
    DEFAULT: () => {
      throw new Error("Action doesn't exist");
    },
  };

  return (actions[action.type] || actions["DEFAULT"])();
}

const getInitialState = () => ({
  pos: 0,
});

export const useSliderReducer = (numItems: number) => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  const previous = useCallback(() => {
    dispatch({ type: ActionType.PREV, numItems });
  }, []);

  const next = useCallback(() => {
    dispatch({ type: ActionType.NEXT, numItems });
  }, [numItems]);

  return { previous, next, state };
};
