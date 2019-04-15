/**
 * Action Types
 */
const Types = {
  a: 'ab',
};

/**
 * Reducer
 */
const INITIAL_STATE = [
  {
    id: 1,
    name: 'Alface',
    price: 0.40,
  },
  {
    id: 2,
    name: 'Bacon',
    price: 2.00,
  },
  {
    id: 3,
    name: 'Hambúrguer de carne',
    price: 3.00,
  },
  {
    id: 4,
    name: 'Ovo',
    price: 0.80,
  },
  {
    id: 5,
    name: 'Queijo',
    price: 1.50,
  },
];

export default function ingredients(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.a:
      return {
        ...state,
        logo: action.value,
      };
    default:
      return state;
  }
}

/**
 * Actions Creators
 */
export const Creators = {
  func: receive => ({
    type: Types.a,
    value: receive,
  }),
};
