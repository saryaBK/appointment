import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  StatusBar
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BackIcon, Card, Header, HeaderText, ProfileImage, SearchIcon, Wrapper } from "./styled";
import { t } from "i18next";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useLanguage } from "../../context/useLang/useLang";
import useTheme from "../../context/useTheme/useTheme";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const { height } = Dimensions.get('window');

const BranchesDetailsContent = ({ data }) => { 
  const Navigation = useNavigation();
  const { theme, toggleTheme } = useTheme();
  const { lang } = useLanguage();

  const [searchText, setSearchText] = useState('');

  const translateY = useSharedValue(-height);

  const toggleDrawer = () => {
    translateY.value = translateY.value === 0 ? -height : 0;
  };

  const closeDrawer = () => {
    translateY.value = -height;
  };

  const handleGoDetails = ({ item }) => {
    Navigation.navigate('EmployeeDetails', { employee_id: item.id });
  };

  const handleGoBack = () => {
    Navigation.goBack(); 
  };

  const renderEmployeeItem = ({ item }) => (
    <Card activeOpacity={0.1} style={styles.card} onPress={() => handleGoDetails({ item })}>
      {
        item?.photo?.file_url ? (
          <ProfileImage source={{ uri: item.photo.file_url }} />
        ) : (
          <ProfileImage style={styles.image} source={require('../../assets/empty_image.png')} />
        )
      }
      <View style={styles.cardContent}>
        {item?.name && <Text style={[styles.employeeName, { color: theme.dark_color }]}>{item.name}</Text>}
        <View style={styles.employeeInfo}>
          {item?.mobile && <Text style={[styles.label, { color: theme.dark_color }]}>{t('Phone')}</Text>}
          {item?.mobile && <Text style={[styles.label, { color: theme.dark_color }]}> {item.mobile}</Text>}
        </View>
      </View>
    </Card>
  );

  const filteredEmployees = useMemo(() => {
    if (!searchText) {
      return data?.employees || [];
    }
    return data?.employees?.filter((item) =>
      item?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      item?.mobile?.toLowerCase().includes(searchText.toLowerCase())
    ) || [];
  }, [searchText, data]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withTiming(translateY.value, { duration: 500 }) }], 
  }));

  const handleTouchOutside = () => {
    if (translateY.value === 0) {
      closeDrawer();
    }
  };

  return (
    <>
    <TouchableWithoutFeedback onPress={handleTouchOutside}>
      <Wrapper style={{ paddingTop: theme.mediumSize + 40 }}>
        <Header>
          <BackIcon>
            <AntDesign onPress={handleGoBack} name={lang == 'ar' ? "arrowright" : "arrowleft"} size={24} color={theme.light} />
          </BackIcon>
          <HeaderText>{data?.name ? data?.name : ''}</HeaderText>
          <SearchIcon>
            <Ionicons onPress={toggleDrawer} name="search" size={24} color={theme.light} />
          </SearchIcon>
        </Header>

        <FlatList
          data={filteredEmployees}
          renderItem={renderEmployeeItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </Wrapper>
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.drawer,{backgroundColor:theme.dark_color}, animatedStyle]}>
        <View style={[styles.drawerHeader,{marginTop:StatusBar.currentHeight}]}>
          <TouchableOpacity onPress={closeDrawer} style={[styles.closeButton]}>
            <Text style={[styles.closeButtonText]}>X</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 10
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    shadowColor: 'rgba(44, 44, 92, 1)',
    elevation: 10,
  },
  card: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  employeeName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  employeeInfo: {
    fontSize: 14,
    flex: 1,
    flexDirection: "column"
  },
  label: {
    fontWeight: "bold",
  },
  // Drawer styles
  drawer: {
    position: 'absolute',
    paddingHorizontal:10,
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: 'transparent',
    paddingHorizontal:20
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 10,
  },
  searchInput: {
    height: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    fontSize: 16,
  },
});

export default BranchesDetailsContent;
