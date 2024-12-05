import styled from 'styled-components/native';
import { View, Text, TouchableOpacity,Image } from 'react-native';

export const Wrapper = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.bg_dark};
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 30px;
`;

export const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding-bottom: 20px;
`;
export const WrapperTime = styled(View)`
  margin-top: 10px;
`;
export const BackIcon = styled(TouchableOpacity)`
  /* padding: 5px; */
`;
export const HeaderText = styled(Text)`
  font-size: ${(props) => `${props.theme.large}px`};
  color:${(props) => props.theme.light};
  font-weight:bold;
`;

export const SearchIcon = styled(TouchableOpacity)`
  border-radius: 10px;
`;

export const Card = styled(TouchableOpacity)`
  flex-direction: row;
  background-color: ${(props) => props.theme.bg_light};
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


