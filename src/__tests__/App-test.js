import React from 'react';
import App from '..';
import { shallow } from 'enzyme';

it('renders correctly', () => {
  const wrapper = shallow(<App />);

  expect(wrapper.find('Routes').exists()).toBe(true);
});
