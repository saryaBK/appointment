import React from 'react';
import { useUser } from '../../context/useUser/useUser';
import { Text } from 'react-native';
import SignInContent from '../SignInContent/SignInContent';
import SignUpContent from '../SignUpContent/SignUpContent';



const UserLoginMethods = () => {
  const {user,setMethodLogType,methodLogType} = useUser()
  

  return(
   methodLogType == 'login' ?
   <SignInContent/> 
   :
   <SignUpContent/>
  )
};

export default UserLoginMethods;
