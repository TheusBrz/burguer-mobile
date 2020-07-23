import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Start from '~/pages/Start';
import Main from '~/pages/Main';
import Basket from '~/pages/Basket';
import Edit from '~/pages/Edit';

export default createAppContainer(
  createSwitchNavigator({
    Start, Main, Basket, Edit,
  }),
);
