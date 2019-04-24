import {
  put,
} from 'redux-saga/effects';

import { Creators as BasketActions } from '~/store/ducks/basket';

import moment from 'moment';
import md5 from 'react-native-md5';
import { navigate } from '~/services/navigation';


export function* addBasket(action) {
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
