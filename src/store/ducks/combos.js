/**
 * Action Types
 */
const Types = {
  REQUEST: 'ADD_BASKET_REQUEST',
};

/**
 * Reducer
 */
const INITIAL_STATE = {
  selected: {},
  combos: [
    {
      id: 1,
      name: 'X-Bacon',
      amount: 1,
      promotions: {
        isLight: false,
        muchMeat: false,
        muchCheese: false,
      },
      ingredients: [
        {
          id: 1,
          name: 'Alface',
          amount: 0,
          unity: 0.40,
          price: 0.00,
          promotion: 0.00,
        },
        {
          id: 2,
          name: 'Bacon',
          amount: 1,
          unity: 2.00,
          price: 2.00,
          promotion: 0.00,
        },
        {
          id: 3,
          name: 'Hambúrguer de carne',
          amount: 1,
          unity: 3.00,
          price: 3.00,
          promotion: 0.00,
        },
        {
          id: 4,
          name: 'Ovo',
          amount: 0,
          unity: 0.80,
          price: 0.00,
          promotion: 0.00,
        },
        {
          id: 5,
          name: 'Queijo',
          amount: 1,
          unity: 1.50,
          price: 1.50,
          promotion: 0.00,
        },
      ],
    },
    {
      id: 2,
      name: 'X-Burger',
      amount: 1,
      promotions: {
        isLight: false,
        muchMeat: false,
        muchCheese: false,
      },
      ingredients: [
        {
          id: 1,
          name: 'Alface',
          amount: 0,
          unity: 0.40,
          price: 0.00,
          promotion: 0.00,
        },
        {
          id: 2,
          name: 'Bacon',
          amount: 0,
          unity: 2.00,
          price: 0.00,
          promotion: 0.00,
        },
        {
          id: 3,
          name: 'Hambúrguer de carne',
          amount: 1,
          unity: 3.00,
          price: 3.00,
          promotion: 0.00,
        },
        {
          id: 4,
          name: 'Ovo',
          amount: 0,
          unity: 0.80,
          price: 0.80,
          promotion: 0.00,
        },
        {
          id: 5,
          name: 'Queijo',
          amount: 1,
          unity: 1.50,
          price: 1.50,
          promotion: 0.00,
        },
      ],
    },
    {
      id: 3,
      name: 'X-Egg',
      amount: 1,
      promotions: {
        isLight: false,
        muchMeat: false,
        muchCheese: false,
      },
      ingredients: [
        {
          id: 1,
          name: 'Alface',
          amount: 0,
          unity: 0.40,
          price: 0.00,
          promotion: 0.00,
        },
        {
          id: 2,
          name: 'Bacon',
          amount: 0,
          unity: 2.00,
          price: 0.00,
          promotion: 0.00,
        },
        {
          id: 3,
          name: 'Hambúrguer de carne',
          amount: 1,
          unity: 3.00,
          price: 3.00,
          promotion: 0.00,
        },
        {
          id: 4,
          name: 'Ovo',
          amount: 1,
          unity: 0.80,
          price: 0.80,
          promotion: 0.00,
        },
        {
          id: 5,
          name: 'Queijo',
          amount: 1,
          unity: 1.50,
          price: 1.50,
          promotion: 0.00,
        },
      ],
    },
    {
      id: 4,
      name: 'X-Egg Bacon',
      amount: 1,
      promotions: {
        isLight: false,
        muchMeat: false,
        muchCheese: false,
      },
      ingredients: [
        {
          id: 1,
          name: 'Alface',
          amount: 0,
          unity: 0.40,
          price: 0.00,
          promotion: 0.00,
        },
        {
          id: 2,
          name: 'Bacon',
          amount: 1,
          unity: 2.00,
          price: 2.00,
          promotion: 0.00,
        },
        {
          id: 3,
          name: 'Hambúrguer de carne',
          amount: 1,
          unity: 3.00,
          price: 3.00,
          promotion: 0.00,
        },
        {
          id: 4,
          name: 'Ovo',
          amount: 1,
          unity: 0.80,
          price: 0.80,
          promotion: 0.00,
        },
        {
          id: 5,
          name: 'Queijo',
          amount: 1,
          unity: 1.50,
          price: 1.50,
          promotion: 0.00,
        },
      ],
    },
    {
      id: 5,
      name: 'Monte do seu jeito!',
      amount: 1,
      promotions: {
        isLight: false,
        muchMeat: false,
        muchCheese: false,
      },
      ingredients: [
        {
          id: 1,
          name: 'Alface',
          amount: 0,
          unity: 0.40,
          price: 0.00,
          promotion: 0.00,
        },
        {
          id: 2,
          name: 'Bacon',
          amount: 0,
          unity: 2.00,
          price: 0.00,
          promotion: 0.00,
        },
        {
          id: 3,
          name: 'Hambúrguer de carne',
          amount: 0,
          unity: 3.00,
          price: 0.00,
          promotion: 0.00,
        },
        {
          id: 4,
          name: 'Ovo',
          amount: 0,
          unity: 0.80,
          price: 0.00,
          promotion: 0.00,
        },
        {
          id: 5,
          name: 'Queijo',
          amount: 0,
          unity: 1.50,
          price: 0.00,
          promotion: 0.00,
        },
      ],
    },
  ],
};

export default function combos(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REQUEST:
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
  addRequest: obj => ({
    type: Types.REQUEST,
    payload: obj,
  }),
};
