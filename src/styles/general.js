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

export const Header = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: ${colors.primary};
  text-align: center;
  font-weight: bold;
  font-size: 30;
  margin: 7% 0;
`;

// Estilos do Hambúrguer
export const Burguer = {
  Container: styled.View`
    padding: 3%;
    background-color: ${colors.option};
    align-self: center;
    border-radius: 6;
    width: 85%;
  `,

  Header: styled.View`
    flex-direction: row;
    margin: 0 2.5%;
    padding: 1% 0;
    justify-content: space-between;
    border-bottom-width: 1px;
    border-color: ${colors.background};
    align-items: center;
  `,

  Name: styled.Text`
    color: ${colors.white};
    font-size: 20;
    text-align: left;
    width: 70%;
  `,

  Actions: styled.TouchableOpacity`
    margin: 0 5% 0 0;
    align-self: center;
  `,

  Footer: styled.View`
    border-top-width: 1px;
    border-color: ${colors.background};
    flex-direction: row;
    padding: 1% 5%;
    justify-content: flex-end;
    align-items: center;
  `,
};

// Estilos dos ingredientes
export const Ingredient = styled.View`
  flex-direction: row;
  margin: 1% 5%;
  justify-content: space-between;
`;

export const IngName = styled.Text`
  color: ${colors.white};
  font-size: 14;
  text-align: left;
  width: 60%;
`;

export const IngActions = styled.TouchableOpacity`
  margin: 0 5%;
`;

export const IngPrice = styled.Text`
  color: ${colors.white};
  font-size: 14;
  text-align: right;
`;

export const Action = styled.TouchableOpacity`
  padding: 5px 0 0 0;
  margin: 0 0 15px 0;
  align-self: center;
`;

export const ActionText = styled.Text`
  color: ${colors.white};
  font-weight: bold;
  font-size: 16;
  text-align: center;
  margin: 0 0 0 5px;
  width: 75%;
`;

export const Separator = styled.View`
background-color: ${colors.background};
height: 10px;
/* width: 100%; */
`;

export const Finish = styled.TouchableOpacity`
  background-color: ${colors.primary};
  width: 85%;
  height: 55;
  border-radius: 6;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

export const FinishText = styled.Text`
  color: ${colors.option};
  text-align: center;
  font-size: 20;
  font-weight: bold;
`;

export const Option = styled.TouchableOpacity`
  align-self: center;
  align-items: center;
  justify-content: center;
  background-color: ${colors.option};
  border-radius: 6;
  height: 60px;
  width: 70%;
`;

export const OptionText = styled.Text`
color: ${colors.white};
font-size: 20;
`;

export const Promotion = styled.Text`
  font-size: 10;
  text-align: left;
`;
