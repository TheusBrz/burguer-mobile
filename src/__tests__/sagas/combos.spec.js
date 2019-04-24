import { runSaga } from 'redux-saga';

import { addBasket } from '~/store/sagas/combos';
import { Creators as BasketActions } from '~/store/ducks/basket';

describe('Combo Saga', () => {
  it('should be able to add a new combo to the basket', async () => {
    const dispatched = [];

    await runSaga({
      dispatch: (action) => {
        dispatched.push(action);
      },
    }, addBasket).toPromise();

    expect(dispatched).toContainEqual([BasketActions.add()]);
  });
});
