import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import GlobalButton from '../GlobalButton/GlobalButton';
import { t } from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../../context/useUser/useUser';
import { postSignOut } from '../../apiMethods/apiCall/post';

export default function ProfileContent() {
  const { user, setMethodLogType, methodLogType,setUser } = useUser();
  const [lod ,setLod] = useState(false)
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
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>My Profile</Text>

      {/* Profile Card */}
      <View style={styles.card}>
        {/* Profile Picture and Name */}
        <View style={styles.topSection}>
          <Image
            source={{
              uri: 'https://via.placeholder.com/100', // Replace with actual image URL
            }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.name}>Alex Rice</Text>
            <View style={styles.idContainer}>
              <Text style={styles.idText}>0123456789</Text>
              <Text style={styles.idLabel}>ID Number</Text>
            </View>
          </View>
        </View>

        {/* User Details */}
        <View style={styles.infoSection}>
          <View style={styles.row}>
            <Text style={styles.label}>Birthday</Text>
            <Text style={styles.value}>20 Sep 2000</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>City</Text>
            <Text style={styles.value}>Dubai, UAE</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Gender</Text>
            <Text style={styles.value}>Male</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>Street 13</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>alexrice2000@gmail.com</Text>
          </View>
        </View>
      </View>
      <GlobalButton 
        onPress={handleSubmit} 
        loading={lod}
        title={t("Sign out")} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7B61FF',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  idContainer: {
    marginTop: 8,
  },
  idText: {
    fontSize: 14,
    color: '#7B61FF',
  },
  idLabel: {
    fontSize: 12,
    color: '#999',
  },
  infoSection: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 24,
  },
});
