
import styled from 'styled-components/native';
import {
  getBottomSpace,
} from 'react-native-iphone-x-helper';
import { colors } from '~/styles';

export const Header = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: ${colors.secundary};
  text-align: center;
  font-weight: bold;
  font-size: 30;
  margin: 5% 0;
`;

export const Option = styled.TouchableOpacity`
  align-self: center;
  align-items: center;
  justify-content: center;
  background-color: ${colors.option};
  border-radius: 5;
  height: 60px;
  width: 70%;
`;

export const OptionText = styled.Text`
color: ${colors.white};
font-size: 20;
`;

export const Separator = styled.View`
background-color: ${colors.background};
height: 10px;
/* width: 100%; */
`;

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
