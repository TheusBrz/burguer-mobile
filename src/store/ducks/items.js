/**
 * Action Types
 */
const Types = {
  NEW: 'NEW_ITEM',
  ADD_ONE: 'ADD_ONE_INGREDIENT',
  REM_ONE: 'REM_ONE_INGREDIENT',
  FINISH: 'FINISH_EDITING',
};

/**
 * Reducer
 */
const INITIAL_STATE = {
  item: {},
};

export default function items(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.NEW:
      return {
        ...state,
        item: action.payload,
      };

    case Types.ADD_ONE:
      return {
        ...state,
      };

    case Types.REM_ONE:
      return {
        ...state,
      };

    default:
      return state;
  }
}

/**
 * Actions Creators
 */
export const Creators = {
  add: item => ({
    type: Types.NEW,
    payload: item,
  }),

  addOne: item => ({
    type: Types.ADD_ONE,
    payload: item,
  }),

  remOne: item => ({
    type: Types.REM_ONE,
    payload: item,
  }),

  finish: item => ({
    type: Types.FINISH,
    payload: item,
  }),
};
