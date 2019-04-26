import api from '~/services/api';
import {
  call, put,
} from 'redux-saga/effects';

import { Creators } from '~/store/ducks';
import { navigate } from '~/services/navigation';

export function* loadCombos() {
  const { data } = yield call(api.get, '/combo/');

  yield put(Creators.success({ array: data }));

  yield navigate('Main');
}
