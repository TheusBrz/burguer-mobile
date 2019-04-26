import {
  all, takeLatest,
} from 'redux-saga/effects';

import { addBasket } from './addBasket';
import { loadCombos } from './loadCombos';
import { addIng } from './addIng';
import { remIng } from './remIng';


export default function* rootSaga() {
  return yield all([
    takeLatest('REQUEST_COMBOS', loadCombos),
    takeLatest('ADD_REQUEST', addBasket),
    takeLatest('ADD_INGREDIENT', addIng),
    takeLatest('REM_INGREDIENT', remIng),
  ]);
}
