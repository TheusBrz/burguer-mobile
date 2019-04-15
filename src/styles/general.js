import { Platform } from 'react-native';
import styled from 'styled-components/native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';

import colors from './colors';

/**
 * Global styles
 */

export const Container = styled.View`
  flex: 1;
  align-items: stretch;
  justify-content: center;
  background-color: ${colors.background};
  padding-top: ${(Platform.OS === 'ios') ? getStatusBarHeight : 0};
  padding-bottom: ${(Platform.OS === 'ios') ? getBottomSpace : 0};
`;
