import styled from 'styled-components/native';
import { View, Text, TouchableOpacity,Image } from 'react-native';

export const Wrapper = styled(View)`
  flex: 1;
  gap: 20;
  background-color: ${(props) => props.theme.bg_dark};
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 30px;
`;

export const ProfileImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

export const UserInfo = styled(Text)`
font-size: ${(props) => `${props.theme.large}px`};
 color:${(props) => props.theme.dark_color};
 font-weight: bold;
`;