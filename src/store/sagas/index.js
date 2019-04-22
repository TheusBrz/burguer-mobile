import {
  all, takeLatest, put, select,
} from 'redux-saga/effects';

import { Creators as BasketActions } from '~/store/ducks/basket';
import { Creators as ItemsActions } from '~/store/ducks/items';

import moment from 'moment';
import md5 from 'react-native-md5';
import { navigate } from '~/services/navigation';

function* addBasket(action) {
  const {
    id, name, ingredients, promotions,
  } = action.payload.item;
  const now = moment();

  const contain = ingredients.filter(ing => ing.amount >= 1);

  const isLight = !!(((contain.filter(ing => ing.name === 'Alface')
    .length >= 1)
    && (contain.filter(ing => ing.name === 'Bacon').length < 1)));

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

  const newItem = {
    id: md5.hex_md5(`${id}|${name}|${now}`),
    name,
    ingredients,
    total: total.price,
    promotions,
  };

  yield put(BasketActions.add(newItem));

  yield navigate('Basket');
}

function* editItem(action) {
  const item = action.payload;

  yield put(ItemsActions.add(item));

  yield navigate('Edit');
}


function* addIng(action) {
  const oldItem = yield select(state => state.items.item);

  const ingredients = oldItem.ingredients.map(ing => (ing.id === action.payload.id
    ? {
      ...ing,
      amount: ing.amount + 1,
      price: (ing.name === 'Queijo'
      || ing.name === 'Hambúrguer de carne')
        ? ((ing.unity * (ing.amount + 1)) - (ing.unity * (Math.floor((ing.amount + 1) / 3))))
        : (ing.unity * (ing.amount + 1)),
    }
    : ing));

  const contain = ingredients.filter(ing => ing.amount >= 1);

  const isLight = !!(((contain.filter(ing => ing.name === 'Alface').length >= 1)
      && (contain.filter(ing => ing.name === 'Bacon').length < 1)));

  let muchMeat = (contain.filter(ing => ing.name === 'Hambúrguer de carne'));

  if (muchMeat[0].amount >= 3) {
    muchMeat = true;
  } else muchMeat = false;
  let muchCheese = (contain.filter(ing => ing.name === 'Queijo'));

  if (muchCheese[0].amount >= 3) {
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

  yield put(ItemsActions.add(newItem));
}


function* remIng(action) {
  const oldItem = yield select(state => state.items.item);

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

  if (muchMeat[0].amount >= 3) {
    muchMeat = true;
  } else muchMeat = false;
  let muchCheese = (contain.filter(ing => ing.name === 'Queijo'));

  if (muchCheese[0].amount >= 3) {
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

  yield put(ItemsActions.add(newItem));
}

export default function* rootSaga() {
  return yield all([
    takeLatest('EDIT_ITEM', editItem),
    takeLatest('ADD_BASKET_REQUEST', addBasket),
    takeLatest('ADD_ONE_INGREDIENT', addIng),
    takeLatest('REM_ONE_INGREDIENT', remIng),
  ]);
}
