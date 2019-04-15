import styled from 'styled-components/native';
import { colors } from '~/styles';

export const Loading = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primary};
`;

export const Logo = styled.Text`
  text-align: center;
  color:${colors.white};
  font-weight: bold;
  font-size: 60;
  margin: 80px 0px;
`;

export const Version = styled.Text`
  color: ${colors.white};
  font-size: 20;
  margin: 0 0 20px 0;
`;
