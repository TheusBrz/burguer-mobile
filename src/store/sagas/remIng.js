
import {
  put, select,
} from 'redux-saga/effects';

import { Creators } from '~/store/ducks';

export function* remIng(action) {
  const oldItem = yield select(state => state.selected);

  const ingredients = oldItem.ingredients.map(ing => (ing.id === action.payload.id
    ? {
      ...ing,
      amount: ing.amount - 1,
      price: (ing.name === 'Queijo'
      || ing.name === 'Hambúrguer de carne')
        ? ((ing.unity * (ing.amount - 1)) - (ing.unity * (Math.floor((ing.amount - 1) / 3))))
        : (ing.unity * (ing.amount - 1)),
    }
    : ing));

  const contain = ingredients.filter(ing => ing.amount >= 1);

  const isLight = !!(((contain.filter(ing => ing.name === 'Alface').length >= 1)
    && (contain.filter(ing => ing.name === 'Bacon').length < 1)));

  let muchMeat = (contain.filter(ing => ing.name === 'Hambúrguer de carne'));
  if ((muchMeat.length === 1) && (muchMeat[0].amount >= 3)) {
    muchMeat = true;
  } else muchMeat = false;

  let muchCheese = (contain.filter(ing => ing.name === 'Queijo'));
  if ((muchCheese.length === 1) && (muchCheese[0].amount >= 3)) {
    muchCheese = true;
  } else muchCheese = false;

  let total = 0.00;

  if ((contain.length >= 1) && (isLight === true)) {
    total = contain.reduce((previousValue, currentValue) => (
      { price: (previousValue.price) + (currentValue.price) }
    ));

    total.price *= 0.9;
  } else if (contain.length >= 1) {
    total = contain.reduce((previousValue, currentValue) => (
      { price: (previousValue.price) + (currentValue.price) }
    ));
  }

  const promotions = {
    isLight,
    muchMeat,
    muchCheese,
  };

  const newItem = {
    ...oldItem,
    ingredients,
    total: total.price,
    promotions,
  };

  yield put(Creators.edit(newItem));
}
