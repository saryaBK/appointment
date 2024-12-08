import styled from 'styled-components/native';
import { View, Text, TouchableOpacity,Image } from 'react-native';

export const Input = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color:${(props) => props.theme.font_dark};
`;



