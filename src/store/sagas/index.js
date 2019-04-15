import {
  all, takeLatest, put, select,
} from 'redux-saga/effects';

import { Creators as BasketActions } from '~/store/ducks/basket';
import { Creators as ItemsActions } from '~/store/ducks/items';

import moment from 'moment';
import md5 from 'react-native-md5';
import { navigate } from '~/services/navigation';

function* addBasket(action) {
  const { id, name, ingredients } = action.payload.item;
  const now = moment();

  const total = ingredients.reduce((previousValue, currentValue) => ({
    price: (previousValue.price) + (currentValue.price),
  }));

  const newItem = {
    id: md5.hex_md5(`${id}|${name}|${now}`),
    name,
    ingredients,
    total: total.price,
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
  console.tron.log('action', action);
  const oldItem = yield select(state => state.items.item);
  console.tron.log('oldItem', oldItem);


  const ingredients = oldItem.ingredients.map(ing => (ing.id === action.payload.id
    ? {
      ...ing,
      amount: ing.amount + 1,
      price: (ing.name === 'Queijo'
      || ing.name === 'Hambúrguer de carne')
        ? (ing.unity * (ing.amount + 1))
        : (ing.unity * (ing.amount + 1)),
    }
    : ing));

  const total = ingredients.reduce((previousValue, currentValue) => ({
    price: (previousValue.price) + (currentValue.price),
  }));

  const newItem = {
    ...oldItem,
    ingredients,
    total: total.price,
  };


  console.tron.log(newItem);
  yield put(ItemsActions.add(newItem));
  // const item = action.payload;
}

function* remIng(action) {
  console.tron.log('action', action);
  const oldItem = yield select(state => state.items.item);
  console.tron.log('oldItem', oldItem);


  const ingredients = oldItem.ingredients.map(ing => (ing.id === action.payload.id
    ? {
      ...ing,
      amount: ing.amount - 1,
      price: (ing.name === 'Queijo'
      || ing.name === 'Hambúrguer de carne')
        ? (ing.unity * (ing.amount - 1))
        : (ing.unity * (ing.amount - 1)),
    }
    : ing));

  const total = ingredients.reduce((previousValue, currentValue) => ({
    price: (previousValue.price) + (currentValue.price),
  }));

  const newItem = {
    ...oldItem,
    ingredients,
    total: total.price,
  };


  console.tron.log(newItem);
  yield put(ItemsActions.add(newItem));
  // const item = action.payload;
}

export default function* rootSaga() {
  return yield all([
    takeLatest('ADD_BASKET_REQUEST', addBasket),
    takeLatest('EDIT_ITEM', editItem),
    takeLatest('ADD_ONE_INGREDIENT', addIng),
    takeLatest('REM_ONE_INGREDIENT', remIng),
  ]);
}
