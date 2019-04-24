import {
  put,
} from 'redux-saga/effects';

import { Creators as ItemsActions } from '~/store/ducks/items';

import { navigate } from '~/services/navigation';

export function* editItem(action) {
  const item = action.payload;

  yield put(ItemsActions.add(item));

  yield navigate('Edit');
}
