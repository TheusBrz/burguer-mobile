import {
  all, takeLatest,
} from 'redux-saga/effects';

import { addBasket } from './combos';
import { editItem } from './basket';
import { addIng, remIng } from './items';

export default function* rootSaga() {
  return yield all([
    takeLatest('ADD_BASKET_REQUEST', addBasket),
    takeLatest('EDIT_ITEM', editItem),
    takeLatest('ADD_ONE_INGREDIENT', addIng),
    takeLatest('REM_ONE_INGREDIENT', remIng),
  ]);
}
