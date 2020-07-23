
import styled from 'styled-components/native';
import {
  getBottomSpace,
} from 'react-native-iphone-x-helper';
import { colors } from '~/styles';

export const Fab = styled.TouchableOpacity`
  position: absolute;
  right: 30;
  bottom: ${30 + getBottomSpace()};
  width: 60;
  height: 60;
  background-color: ${colors.primary};
  border-radius: 30;
  align-items: center;
  justify-content: center;
`;
