import { combineReducers } from 'redux';

import combos from './combos';
import basket from './basket';
import items from './items';

export default combineReducers({
  combos,
  basket,
  items,
});
