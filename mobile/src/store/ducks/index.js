/**
 * Action Types
 */
const Types = {
  REQUEST: 'REQUEST_COMBOS',
  SUCCESS: 'REQUEST_SUCCESS',

  ADD_REQ: 'ADD_REQUEST',
  ADD_SUC: 'ADD_SUCCESS',

  REM: 'REM_ITEM',

  EDIT: 'EDIT_ITEM',
  END_EDIT: 'END_ITEM_EDIT',

  ADD_ING: 'ADD_INGREDIENT',
  REM_ING: 'REM_INGREDIENT',
};

/**
 * Reducer
 */
const INITIAL_STATE = {
  data: [],
  basket: [],
  selected: {},
};

export default function combos(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REQUEST:
      return {
        ...state,
      };

    case Types.SUCCESS:
      return {
        ...state,
        data: action.payload.array,
      };

    case Types.ADD_REQ:
      return {
        ...state,
      };

    case Types.ADD_SUC:
      return {
        ...state,
        basket: [
          ...state.basket,
          action.payload,
        ],
      };

    case Types.EDIT:
      return {
        ...state,
        selected: action.payload,
      };

    case Types.END_EDIT:
      return {
        ...state,
        basket: [
          ...state.basket,
          action.payload.item,
        ],
      };

    case Types.REM:
      return {
        ...state,
        basket: state.basket.filter(item => item.id !== action.payload.id),
      };

    case Types.ADD_ING:
      return {
        ...state,
      };

    case Types.REM_ING:
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

  load: () => ({
    type: Types.REQUEST,
    payload: {},
  }),

  success: array => ({
    type: Types.SUCCESS,
    payload: array,
  }),

  add: obj => ({
    type: Types.ADD_REQ,
    payload: obj,
  }),

  addSuc: obj => ({
    type: Types.ADD_SUC,
    payload: obj,
  }),

  edit: item => ({
    type: Types.EDIT,
    payload: item,
  }),

  endEdit: item => ({
    type: Types.END_EDIT,
    payload: item,
  }),

  rem: item => ({
    type: Types.REM,
    payload: item,
  }),

  addIng: item => ({
    type: Types.ADD_ING,
    payload: item,
  }),

  remIng: item => ({
    type: Types.REM_ING,
    payload: item,
  }),
};
