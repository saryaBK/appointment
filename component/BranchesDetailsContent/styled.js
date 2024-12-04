import styled from 'styled-components/native';
import { View, Text, TouchableOpacity,Image } from 'react-native';

export const Wrapper = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.bg};
  padding-left: 20px;
  padding-right: 20px;
`;

export const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const BackIcon = styled(TouchableOpacity)`
  /* padding: 5px; */
`;
export const HeaderText = styled(Text)`
  font-size: ${(props) => `${props.theme.large}px`};
  color:${(props) => props.theme.main_light_font};
  font-weight:bold;
`;

export const SearchIcon = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.bg};
  border-radius: 10px;
`;

export const Card = styled(TouchableOpacity)`
  flex-direction: row;
  background-color: ${(props) => props.theme.bg};
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 15px;
`;
export const ProfileImage = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 7px;
  margin-right: 15px;
`;


