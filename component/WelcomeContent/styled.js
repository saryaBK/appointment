import styled from 'styled-components/native';
import { View, Text, TouchableOpacity } from 'react-native';

export const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.dark_color};
  padding: 40px 20px;
`;

export const LogoContainer = styled(View)`
  flex: 1;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

export const MainText = styled(Text)`
  font-size: ${(props) => `${props.theme.xLarge}px`};
  font-weight: bold;
  color:${(props) => props.theme.white_color} ;
  margin-bottom: 8px;
`;

export const MainSubText = styled(Text)`
  font-size: ${(props) => `${props.theme.large}px`};
  color:${(props) => props.theme.white_color} ; 
`;
