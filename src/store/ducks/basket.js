/**
 * Action Types
 */
const Types = {
  NEW: 'NEW_ITEM',
  REM: 'REM_ITEM',
  EDIT: 'EDIT_ITEM',
};

/**
 * Reducer
 */
const INITIAL_STATE = {
  items: [],
};

export default function basket(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.NEW:
      return {
        items: [
          ...state.items,
          action.payload,
        ],
      };

    case Types.REM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
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

  rem: item => ({
    type: Types.REM,
    payload: item,
  }),

  edit: item => ({
    type: Types.EDIT,
    payload: item,
  }),
};
