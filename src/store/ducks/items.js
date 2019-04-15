/**
 * Action Types
 */
const Types = {
  NEW: 'NEW_ITEM',
  ADD_ONE: 'ADD_ONE_INGREDIENT',
  REM_ONE: 'REM_ONE_INGREDIENT',
  FINISH: 'FINISH_EDITING',
  NEW_ING: 'NEW_INGREDIENT',
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
        // item: {
        //   ...state.item,
        //   ingredients: state.item.ingredients.map(ing => (ing.id === action.payload.id
        //     ? { ...ing, amount: ing.amount + 1, price: (ing.unity * (ing.amount + 1)) }
        //     : ing)),
        // },
      };

    case Types.REM_ONE:
      return {
        ...state,
        // item: {
        //   ...state.item,
        //   ingredients: state.item.ingredients.map(ing => (ing.id === action.payload.id
        //     ? { ...ing, amount: ing.amount - 1, price: (ing.unity * (ing.amount - 1)) }
        //     : ing)),
        // },
      };

    case Types.NEW_ING:
      return {
        ...state,
        item: {
          ...state.item,
          ingredients: [
            ...state.item.ingredients,
            action.payload,
          ],
        },
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

  newIng: item => ({
    type: Types.NEW_ING,
    payload: item,
  }),
};
