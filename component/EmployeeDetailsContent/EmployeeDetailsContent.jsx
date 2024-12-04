import { t } from "i18next";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Button } from "react-native";
import { BackIcon, Card, Header, HeaderText, ProfileImage, Wrapper, WrapperTime } from "./styled";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAvailableAppointment } from "../../apiMethods/apiCall/get";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useQuery } from '@tanstack/react-query';
import AppointmentTimeBar from "../AppointmentTimeBar/AppointmentTimeBar";
import GlobalButton from "../GlobalButton/GlobalButton";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useLanguage } from "../../context/useLang/useLang";
import useTheme from "../../context/useTheme/useTheme";

export default function EmployeeDetailsContent({data}) {
  const { lang } = useLanguage();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [specifiedBookingDate, setspecifiedBookingDate] = useState('');
  var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  var newDate = new Date(selectedDate).toLocaleDateString('en-CA', options).replace(/\//g, '-');

  const id = data.id

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm =async (date) => {
    setSelectedDate(date.toDateString()); 
    hideDatePicker();
  };

  const { data:dateData, isLoading } = useQuery({
    queryKey: ['available-appointment', id,newDate],
    queryFn: async () => {
      const res = await getAvailableAppointment({id,date:newDate})
      if (res && res?.data) {
        return res.data;
      }
    },
    staleTime: Infinity,
    enabled:id && newDate != 'Invalid Date' ? true : false
  });

  const {theme} = useTheme();
  const Navigation = useNavigation()

  const handleGoBack = () => {
    Navigation.goBack(); 
  };

  return (
    <Wrapper style={{paddingTop: theme.mediumSize + 40}}>
      <Header>
        <BackIcon>
          <AntDesign onPress={handleGoBack} name={lang == 'ar'?"arrowright":"arrowleft"} size={24} color={theme.main_light} />
        </BackIcon>
        <HeaderText>{(data?.name) ? data?.name : ''}</HeaderText>
      </Header>

      <Card activeOpacity={1} style={styles.card}>
        {
          data.photo.file_url ? (
            <ProfileImage source={{ uri: data.photo.file_url }} />
          ) : (
            <ProfileImage style={styles.image} source={require('../../assets/empty_image.png')} />
          )
        }
        <View style={styles.cardContent}>
          {data?.branch?.name && <Text style={[styles.BranchName]}>{t('branch')}</Text>}
          {data?.branch?.name && <Text style={[styles.BranchName,{color: theme.main_light }]}>{data.branch.name}</Text>}
          <View style={styles.employeeInfo}>
          {data?.phone && <Text style={[styles.label]}>{t('Phone')}</Text>}
          {data?.phone && <Text style={[styles.label,{color: theme.main_light }]}>{data.phone}</Text>}
          </View>
        </View>
      </Card>

      <Text style={styles.sectionTitle}>{t('Choose available date')}</Text>

      <View>
        <Text style={styles.label}>Selected Date:</Text>
        <Text style={[styles.date,{color: theme.main_light }]}>{newDate != 'Invalid Date'? newDate : 'No date selected'}</Text>
        <GlobalButton width='100%' onPress={showDatePicker} title={t("Pick a Date")} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date" 
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          themeVariant="dark"
          textColor="#1e90ff"
        />
      </View>


      {
        dateData && dateData.length > 0 ?
        <WrapperTime>
        <Text style={styles.sectionTitle}>{t('Choose available time')}</Text>
        <AppointmentTimeBar dateData={dateData} theme={theme} setspecifiedBookingDate={setspecifiedBookingDate}/>
        </WrapperTime>
      :
      <Text style={styles.sectionTitle}>{t('There is no time available on this date')}</Text>
      }
      <View style={styles.sendWrapperBtn}>
      <GlobalButton width='100%' title={t("Reserve Appointment")} />
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  cardContent: {
    flex: 1,
    justifyContent: "center",
    gap:4
  },
  BranchName: {
    fontWeight: "bold",
    color: "#333333",
  },
  employeeInfo: {
    fontSize: 14,
    color: "#666666",
    flex:1,
    flexDirection:"column"
  },
  label: {
    fontWeight: "bold",
    color: "#333333",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
    paddingTop:10
  },
  monthText: {
    fontSize: 14,
    color: "#6A1B9A",
    marginBottom: 16,
  },
  dateList: {
    marginBottom: 16,
  },
  reserveButton: {
    backgroundColor: "#8146F0",
    paddingVertical: 16,
    marginVertical:20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  reserveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  date: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  sendWrapperBtn:{
    top:0,
    marginTop:'auto',
  }
});
