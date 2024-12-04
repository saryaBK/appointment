import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute  } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { BackIcon, Card, Header, HeaderText, ProfileImage, SearchIcon, Wrapper } from "./styled";
import { t } from "i18next";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useLanguage } from "../../context/useLang/useLang";
import useTheme from "../../context/useTheme/useTheme";
import ThemeToggleButton from "../ThemeToggleButton/ThemeToggleButton";

const BranchesDetailsContent = ({data}) => { 
  const Navigation = useNavigation()
  const {theme,toggleTheme} = useTheme();
  const { lang } = useLanguage();

  const handleGoDetails= ({item}) => {
    Navigation.navigate('EmployeeDetails', {employee_id:item.id})
  };
  const handleGoBack = () => {
    Navigation.goBack(); 
  };
  const renderEmployeeItem = ({ item }) => (
    <Card activeOpacity={0.1} style={styles.card} onPress={()=>handleGoDetails({item})}>
      {
        item?.photo?.file_url ? (
          <ProfileImage source={{ uri: item.photo.file_url }} />
        ) : (
          <ProfileImage style={styles.image} source={require('../../assets/empty_image.png')} />
        )
      }
      <View style={styles.cardContent}>
        {item?.name && <Text style={[styles.employeeName,, { color: theme.dark_color }]}>{item.name}</Text>}
        <View style={styles.employeeInfo}>
          {item?.mobile&& <Text style={[styles.label, { color: theme.dark_color }]}>{t('Phone')}</Text>}
          {item?.mobile&& <Text style={[styles.label, { color: theme.dark_color }]}> {item.mobile}</Text>}
        </View>
      </View>
    </Card>
  );

  return (
    <Wrapper style={{paddingTop: theme.mediumSize + 40}}>
      <Header>
        <BackIcon>
        <AntDesign onPress={handleGoBack} name={lang == 'ar'?"arrowright":"arrowleft"} size={24} color={theme.light} />
        </BackIcon>
        <HeaderText>{(data?.name) ? data?.name : ''}</HeaderText>
        <SearchIcon>
          <Ionicons name="search" size={24} color={theme.light} />
        </SearchIcon>
      </Header>

      <FlatList
        data={data?.employees}
        renderItem={renderEmployeeItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding:10
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    shadowColor: 'rgba(44, 44, 92, 1)',
    elevation: 10, // للـ Android
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
    flex:1,
    flexDirection:"column"
    // color: "#666666",
  },
  label: {
    fontWeight: "bold",
  },
});

export default BranchesDetailsContent;
