import styled from 'styled-components/native';
import { View, Text, TouchableOpacity,Image } from 'react-native';

export const Wrapper = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.bg};
  padding-left: 20px;
  padding-right: 20px;
`;
export const BranchDetails = styled(View)`
  flex: 1;
  flex-direction: column;
  padding: 10px 0px;
`;
export const BranchName = styled(Text)`
  font-size: ${(props) => `${props.theme.large}px`};
  color:${(props) => props.theme.dark_font};
  font-weight:bold;
`;
export const BranchNote = styled(Text)`
  font-size: ${(props) => `${props.theme.large}px`};
  color:${(props) => props.theme.dark_font};
`;

export const FindText = styled(Text)`
  font-size: ${(props) => `${props.theme.large}px`};
  font-weight:bold;
  color:${(props) => props.theme.main_light_font};
  padding-bottom:10px
`;
export const Card = styled(TouchableOpacity)`
  flex: 1;
  gap: 10px;
  flex-direction: row;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 16px;
  /* align-items: center; */
`;

export const ProfileImage = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;
