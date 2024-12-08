import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity,Dimensions } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import GlobalButton from '../GlobalButton/GlobalButton';
import { t } from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../../context/useUser/useUser';
import { postSignOut } from '../../apiMethods/apiCall/post';
import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton';
import useTheme from '../../context/useTheme/useTheme';
import {ImageWrapper, PhoneAndNameWrapper, PhoneWrapper, ProfileImage, TopSectionWrapper, UserInfo, Wrapper} from "./styled";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useQueryClient } from '@tanstack/react-query';
import DrawerEditAccount from '../DrawerEditAccount/DrawerEditAccount';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useLanguage } from '../../context/useLang/useLang';

export default function ProfileContent() {
  const { user, setMethodLogType, methodLogType,setUser } = useUser();
  const [lod ,setLod] = useState(false)
  const { theme ,setIsEnabled,isEnabled,toggleTheme} = useTheme();
  const queryClient = useQueryClient();
  const { lang } = useLanguage();

  const handleSubmit = async ()=> {
    setLod(true)
    const send = await postSignOut();
    if(send && send.res && send.res.ok){
      setUser(null)
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('s_id');
      // await AsyncStorage.removeItem('jwt');
    }
    setLod(false)
  }

  const [isOpen, setIsOpen] = useState(false);
  const { height } = Dimensions.get('window');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const drawerTranslateY = useSharedValue(height);

  const toggleDrawer = () => {
    if (isOpen) {
      drawerTranslateY.value = withSpring(height, { damping: 15 });
    } else {
      drawerTranslateY.value = withSpring(height * 0.25, { damping: 15 });
    }
    setIsOpen(!isOpen);
  };

  const animatedDrawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: drawerTranslateY.value }],
  }));

  return (
   <>
    <Wrapper style={{paddingTop: theme.mediumSize + 40}}>
    <View style={[{flexDirection:"row",justifyContent:"space-between"}]}>
    <Text style={[styles.title,{color: theme.light }]}>My Profile</Text>
    <FontAwesome5 name="edit" size={24} color={theme.font_dark} onPress={toggleDrawer}/>
    </View>
    <TopSectionWrapper>
        <ImageWrapper>
          {user.photo ? (
            <ProfileImage style={[styles.ImageBorder,{objectFit:"fill"}]} source={{ uri: user.photo.url}} />
          ) : (
            <ProfileImage style={[styles.ImageBorder,{objectFit:"cover"}]} source={require('../../assets/user_avatar.png')} />
          )}
        </ImageWrapper>
        <PhoneAndNameWrapper>
            <Text style={[styles.name,{color:theme.font_dark}]}>{`${user?.first_name || ''} ${user?.last_name || ''}`}</Text>

          <PhoneWrapper>
            <Text style={{color:theme.dark_color,fontWeight:"bold",flexWrap:"wrap"}}>{t('mobile')}</Text>
            <Text style={{color:theme.dark_color}}>{user?.mobile ? user.mobile : ""}</Text>
          </PhoneWrapper>

        </PhoneAndNameWrapper>
    </TopSectionWrapper>

    <View style={[styles.profileCard,{backgroundColor:theme.bg_light}]}>
      <View style={styles.detailsSection}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Birthday</Text>
          <UserInfo style={styles.value}>
            {user.birthday ? user.birthday : "N/A"}
          </UserInfo>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Gender</Text>
          <UserInfo style={styles.value}>
          {user.gender ? user.gender === "m" ? lang === "ar" ? "ذكر" : "Men" : 
            user.gender === "f" ? lang === "ar" ? "أنثى" : "Female": "N/A": "N/A"}
          </UserInfo>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Email</Text>
          <UserInfo style={styles.value}>
            {user.email ? user.email : "N/A"}
          </UserInfo>
        </View>
      </View>
    </View>
    {/* <ThemeToggleButton onToggle={toggleTheme} /> */}

    <GlobalButton 
    style={styles.sendWrapperBtn}
    onPress={handleSubmit} 
    loading={lod}
    title={t("Sign out")} />
  </Wrapper>
  <DrawerEditAccount animatedDrawerStyle={animatedDrawerStyle} toggleDrawer={toggleDrawer}/>
   </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  ImageBorder: {
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  profileCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginTop:20
  },
  userInfo: {
    padding:20,
    paddingBottom:10
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#9E9E9E",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A4A4A",
  },
  idText: {
    fontSize: 14,
    color: "#9E9E9E",
  },
  detailsSection: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#9E9E9E",
  },
  sendWrapperBtn:{
    top:0,
    marginTop:'auto',
  },
  editButton: {
    backgroundColor: "#6200EE",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
})