import styled from 'styled-components/native';
import { View, Text, TouchableOpacity,Image } from 'react-native';

export const Wrapper = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.bg_dark};
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
  color:${(props) => props.theme.dark_color};
  font-weight:bold;
`;
export const BranchNote = styled(Text)`
  font-size: ${(props) => `${props.theme.large}px`};
  color:${(props) => props.theme.dark_color};
`;

export const FindText = styled(Text)`
  font-size: ${(props) => `${props.theme.large}px`};
  width:250px;
  font-weight:bold;
  color:${(props) => props.theme.light};
  padding-bottom:10px;
`;
export const Card = styled(TouchableOpacity)`
  flex: 1;
  gap: 10px;
  flex-direction: row;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 16px;
  background-color:${(props) => props.theme.bg_light} ;
  /* align-items: center; */
`;

export const ProfileImage = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;

