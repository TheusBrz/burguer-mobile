import api from '~/services/api';
import {
  call, put,
} from 'redux-saga/effects';
import moment from 'moment';
import md5 from 'react-native-md5';

import { Creators } from '~/store/ducks';
import { navigate } from '~/services/navigation';

export function* addBasket(action) {
  const {
    item,
  } = action.payload;

  const now = moment();

  const { data } = yield call(api.get, `/combo/${parseInt(item.id, 10)}`);

  const contain = data.ingredients.filter(ing => ing.amount >= 1);

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
    id: md5.hex_md5(`${item.id}|${item.name}|${now}`),
    name: data.name,
    ingredients: data.ingredients,
    total: total.price,
    promotions: data.promotions,
  };

  if (newItem.name === 'Monte do seu jeito!') {
    yield put(Creators.edit(newItem));
    yield navigate('Edit');
  } else {
    yield put(Creators.addSuc(newItem));
    yield navigate('Basket');
  }
}
