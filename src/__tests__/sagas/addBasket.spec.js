import { runSaga } from 'redux-saga';
import moment from 'moment';
import md5 from 'react-native-md5';

import { addBasket } from '~/store/sagas/addBasket';
import { Creators } from '~/store/ducks';


const id = 1;
const name = 'X-Bacon';

const now = moment();

const result = {
  id: `${md5.hex_md5(`${id}|${name}|${now}`)}`,
  name: 'X-Bacon',
  ingredients: [
    {
      id: 1,
      name: 'Alface',
      amount: 0,
      unity: 0.4,
      price: 0,
      promotion: 0,
    },
    {
      id: 2,
      name: 'Bacon',
      amount: 1,
      unity: 2,
      price: 2,
      promotion: 0,
    },
    {
      id: 3,
      name: 'Hambúrguer de carne',
      amount: 1,
      unity: 3,
      price: 3,
      promotion: 0,
    },
    {
      id: 4,
      name: 'Ovo',
      amount: 0,
      unity: 0.8,
      price: 0,
      promotion: 0,
    },
    {
      id: 5,
      name: 'Queijo',
      amount: 1,
      unity: 1.5,
      price: 1.5,
      promotion: 0,
    },
  ],
  total: 6.5,
  promotions: {
    isLight: false,
    muchMeat: false,
    muchCheese: false,
  },
};

describe('addBasket Saga', () => {
  it('should be able to add a combo to basket', async () => {
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action) => {
          dispatched.push(action);
        },
      },
      addBasket,
      Creators.add({ id, name }),
    ).toPromise();

    expect(dispatched).toContainEqual(
      Creators.addSuc(result),
    );
  });
});
