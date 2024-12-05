import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import GlobalButton from '../GlobalButton/GlobalButton';
import { t } from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../../context/useUser/useUser';
import { postSignOut } from '../../apiMethods/apiCall/post';
import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton';
import useTheme from '../../context/useTheme/useTheme';
import {ProfileImage, UserInfo, Wrapper} from "./styled";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function ProfileContent() {
  const { user, setMethodLogType, methodLogType,setUser } = useUser();
  const [lod ,setLod] = useState(false)
  const { theme ,setIsEnabled,isEnabled,toggleTheme} = useTheme();
  console.log(user)

  const handleSubmit = async ()=> {
    setLod(true)
    const send = await postSignOut();
    if(send && send.res && send.res.ok){
      setUser(null)
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('s_id');
    }
    setLod(false)
    
  }

  return (
    <Wrapper style={{paddingTop: theme.mediumSize + 40}}>
    <View style={[{flexDirection:"row",justifyContent:"space-between"}]}>
    <Text style={[styles.title,{color: theme.light }]}>My Profile</Text>
    <FontAwesome5 name="edit" size={24} color={theme.font_dark} />
    </View>
    <View style={styles.topSection}>
        <View style={styles.photo}>
          {user.photo ? (
            <ProfileImage source={{ uri: user.photo.url }} style={styles.photoImage} />
          ) : (
            <ProfileImage style={[styles.photoImage,{objectFit:"fill"}]} source={require('../../assets/empty_image.png')} />
          )}
        </View>
        <View style={styles.userInfo}>
          <Text style={[styles.name,{color:theme.font_dark}]}>{`${user.first_name} ${user.last_name}`}</Text>
          <View style={{top:0,marginTop:"auto",backgroundColor: '#F2EEFB',padding:10,borderRadius:10}}>
          <Text style={{color:theme.dark_color,fontWeight:"bold"}}>{t('mobile')}</Text>
          <Text style={{color:theme.dark_color}}>{user?.mobile ? user.mobile : ""}</Text>
          </View>
        </View>
    </View>

    <View style={[styles.profileCard,{backgroundColor:theme.bg_light}]}>
      <View style={styles.detailsSection}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Birthday</Text>
          <UserInfo style={styles.value}>
            {user.birthdate ? user.birthdate : "N/A"}
          </UserInfo>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Gender</Text>
          <UserInfo style={styles.value}>
            {user.gender ? user.gender : "N/A"}
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
    <GlobalButton 
      onPress={handleSubmit} 
      loading={lod}
      title={t("Sign out")} />
    <ThemeToggleButton onToggle={toggleTheme} /> 
  </Wrapper>
        

  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
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
  topSection: {
    flexDirection:"row",
    gap:10,
  },
  userInfo: {
    padding:20,
    paddingBottom:10
  },
  photo: {
    width: 180,
    height: 150,
    borderRadius: 12,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  photoImage: {
    width: "100%",
    height: "100%",
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
  value: {

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