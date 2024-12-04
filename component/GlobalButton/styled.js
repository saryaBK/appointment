import styled from 'styled-components/native';
import { View, Text, TouchableOpacity } from 'react-native';

export const BtnText = styled(Text)`
  font-size: ${(props) => `${props.theme.large}px`};
  color:${(props) => props.theme.light_color} ;
`;
