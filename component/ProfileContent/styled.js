import styled from 'styled-components/native';
import { View, Text, TouchableOpacity,Image } from 'react-native';

export const Wrapper = styled(View)`
  flex: 1;
  gap: 20px;
  background-color: ${(props) => props.theme.bg_dark};
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 30px;
`;
export const TopSectionWrapper = styled(View)`
 flex-direction: row;
 gap: 10px;
 width: 100%;
 height: 180px;
`;
export const ImageWrapper = styled(View)`
  background-color:${(props) => props.theme.bg_light} ;
  width: 50%;
  border-radius: 20px;
`;
export const PhoneAndNameWrapper = styled(View)`
  width: 50%;
  margin-top: 20px;
`;
export const PhoneWrapper = styled(View)`
  top: 0;
  margin-top: auto;
  background-color: #F2EEFB;
  padding: 10px;
  border-radius: 10px;
  width: 80%;
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