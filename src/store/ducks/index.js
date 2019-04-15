import { combineReducers } from 'redux';

import ingredients from './ingredients';
import combos from './combos';
import basket from './basket';
import items from './items';

export default combineReducers({
  ingredients,
  combos,
  basket,
  items,
});
