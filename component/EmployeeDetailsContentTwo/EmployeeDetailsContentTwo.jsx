import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { Alert,View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Button, ScrollView,Dimensions, StatusBar } from "react-native";
import { BackIcon, Card, Header, HeaderText, ProfileImage, Wrapper, WrapperTime } from "./styled";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAvailableAppointment } from "../../apiMethods/apiCall/get";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import AppointmentTimeBar from "../AppointmentTimeBar/AppointmentTimeBar";
import GlobalButton from "../GlobalButton/GlobalButton";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useLanguage } from "../../context/useLang/useLang";
import useTheme from "../../context/useTheme/useTheme";
import AppointmentTypeCheckBox from "../AppointmentTypeCheckBox/AppointmentTypeCheckBox";
import { postCustomerAppointment } from "../../apiMethods/apiCall/post";
import UserLoginMethods from "../UserLoginMethods/UserLoginMethods";

const { height } = Dimensions.get('window');

const EmployeeDetailsContentTwo = ({data,serviceTypeData,user}) => {
    const { lang } = useLanguage();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [lod, setLod] = useState(false);
    const {theme,toggleTheme} = useTheme();
    const Navigation = useNavigation()
    const [specifiedBookingDate, setspecifiedBookingDate] = useState('');
    const [selectedTimeId, setSelectedTimeId] = useState(null);
    const [selectedServiceId, setSelectedserviceId] = useState([]);
    var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    var newDate = new Date(selectedDate).toLocaleDateString('en-CA', options).replace(/\//g, '-');
    const id = data.id
    const [isOpen, setIsOpen] = useState(false);
    const drawerHeight = useSharedValue(-height);
    const queryClient = useQueryClient();

    const toggleDrawer = () => {
      drawerHeight.value = isOpen ? -height : 0;
      setIsOpen(!isOpen);
    };

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: withSpring(drawerHeight.value, { damping: 15 }) }],
      };
    });

    const showDatePicker = () => {
      setSelectedTimeId(null)
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
    
  
    
    const handleAppointmentData = async ()=> {
      setLod(true)
      if(!user){
        toggleDrawer()
      }else{
        const sendData = {
          available_appointment_id: selectedTimeId,
          services: selectedServiceId,
          urgent: "1"
        };
        const res = await postCustomerAppointment(sendData)
        if(res && res.res && res.res.ok){
          queryClient.invalidateQueries({queryKey:['customer-appointment', lang]})
          queryClient.invalidateQueries({queryKey:['available-appointment']})
          queryClient.invalidateQueries({queryKey:['branch-name-by-id']})
          setSelectedTimeId(null)
          setSelectedserviceId([])
          setSelectedDate('')
          setTimeout(() => {
              Navigation.navigate('MyAppointments')
          }, 100)
        }
      }
      setLod(false)
      
    }
  
    const handleGoBack = () => {
      Navigation.goBack(); 
    };

  return (
    <>
    <Wrapper style={{paddingTop: theme.mediumSize + 40}}>
        <Header>
            <BackIcon>
            <AntDesign onPress={handleGoBack} name={lang == 'ar'?"arrowright":"arrowleft"} size={24} color={theme.light} />
            </BackIcon>
            <HeaderText>{(data?.name) ? data?.name : ''}</HeaderText>
        </Header>
      <FlatList
        data={[{ id: "header" }, { id: "list1" },{ id: "list2" },{ id: "footer" }/*, ...dataList2*/]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (item.id === "header") {
            return (
              <>
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
                    {data?.mobile && <Text style={[styles.label]}>{t('Phone')}</Text>}
                    {data?.mobile && <Text style={[styles.label,{color: theme.main_light }]}>{data.mobile}</Text>}
                    </View>
                    </View>
                </Card>

                <Text style={[styles.sectionTitle, { color: theme.font_dark }]}>{t('Choose available date')}</Text>

                <View>
                    <Text style={[styles.label, { color: theme.font_dark }]}>Selected Date:</Text>
                    <Text style={[styles.date,{color: theme.font_dark }]}>{newDate != 'Invalid Date'? newDate : 'No date selected'}</Text>
                    <GlobalButton width='100%' onPress={showDatePicker} title={t("Pick a Date")} />
                    <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date" 
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    themeVariant="dark"
                    textColor="#04192d"
                    />
                </View>
              </>
            );
          } else if (item.id === "list1") {
            return (
              <>
              {
                    dateData && dateData.length > 0 ?
                    <WrapperTime>
                    <Text style={[styles.sectionTitle,{color: theme.font_dark }]}>{t('Choose available time')}</Text>
                    <AppointmentTimeBar 
                    dateData={dateData} 
                    theme={theme} 
                    setspecifiedBookingDate={setspecifiedBookingDate} 
                    specifiedBookingDate={specifiedBookingDate}
                    setSelectedTimeId={setSelectedTimeId}/>
                    </WrapperTime>
                :
                <Text style={[styles.sectionTitle, { color: theme.font_dark }]}>{t('There is no time available on this date')}</Text>
                }
              </>
            );
          } else if (item.id === "list2") {
            return (
              <>
              <AppointmentTypeCheckBox 
                serviceTypeData={serviceTypeData} 
                setSelectedserviceId={setSelectedserviceId} 
                selectedServiceId={selectedServiceId}/>
              </>
            );
          }else if (item.id === "footer") {
            return (
            <View style={[styles.sendWrapperBtn,{paddingTop:"10"}]}>
            <GlobalButton
             disabled={(!selectedTimeId || selectedServiceId?.length == 0) ? true : false}
             onPress={handleAppointmentData}
             loading={lod}
             width='100%' 
             title={t("Reserve Appointment")} />
            </View>
            );
          }
        }}
        contentContainerStyle={styles.listContainer}
        nestedScrollEnabled={true} // تمكين التمرير المتداخل
        showsVerticalScrollIndicator={false} // إخفاء شريط التمرير
        // ListFooterComponent={
        //     <Text>
        //         Im Footer
        //     </Text>
        // }
      />
    </Wrapper>
    {!user ?
    <Animated.View style={[styles.drawer, animatedStyle]}>
         <TouchableOpacity style={[styles.closeButton,{marginTop:StatusBar.currentHeight + 5}]} onPress={toggleDrawer}>
            <AntDesign name="close" size={24} color={theme.font_dark} />
        </TouchableOpacity>
        <UserLoginMethods/>
    </Animated.View>
    : null}
    </>
  );
};

const styles = StyleSheet.create({
    cardContent: {
      flex: 1,
      justifyContent: "center",
      gap:4
    },
    BranchName: {
      fontWeight: "bold",
    },
    employeeInfo: {
      fontSize: 14,
      flex:1,
      flexDirection:"column"
    },
    label: {
      fontWeight: "bold",
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
      marginBottom: 8,
      paddingTop:10
    },
    monthText: {
      fontSize: 14,
      marginBottom: 16,
    },
    dateList: {
      marginBottom: 16,
    },
    reserveButton: {
      paddingVertical: 16,
      marginVertical:20,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    reserveButtonText: {
      fontSize: 16,
      fontWeight: "bold",
    },
    date: {
      fontSize: 16,
      marginBottom: 20,
    },
    sendWrapperBtn:{
      top:0,
      marginTop:'auto',
    },
    button: {
      backgroundColor: '#6200ee',
      padding: 15,
      borderRadius: 8,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    drawer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: height / 1,
      justifyContent: 'center',
  },
  closeButton: {
      position: 'absolute',
      top: 20,
      right: 20,
      zIndex: 10,
  },
    drawerText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

export default EmployeeDetailsContentTwo;
