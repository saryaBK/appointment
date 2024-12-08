import React from 'react';
import ProfileContent from '../component/ProfileContent/ProfileContent';
import { useUser } from '../context/useUser/useUser';
import SignInContent from '../component/SignInContent/SignInContent';
import UserLoginMethods from '../component/UserLoginMethods/UserLoginMethods';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Profile = () => {
  const {user} = useUser()

  return(
    !user 
    ?
    <UserLoginMethods/>
    :
    <ProfileContent/>
  )
};

export default Profile;











