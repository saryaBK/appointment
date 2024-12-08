import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, ScrollView } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useUser } from '../../context/useUser/useUser';
import GlobalButton from '../GlobalButton/GlobalButton';
import { t } from 'i18next';
import { useQueryClient } from '@tanstack/react-query';
import { editAccount } from '../../apiMethods/apiCall/put';
import useTheme from '../../context/useTheme/useTheme';
import { Input } from './styled';

const { height } = Dimensions.get('window');

const DrawerEditAccount = ({animatedDrawerStyle,toggleDrawer}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { theme } = useTheme();
  const { user, setMethodLogType, methodLogType,setUser } = useUser();
  const [lod, setLod] = useState(false);
  const queryClient = useQueryClient();

  const handleEditAccount = async (values) => {
    setLod(true);
    const send = await editAccount({data:values})
    if(send){
    setTimeout(() => {
        queryClient.invalidateQueries({queryKey:['account']})
        toggleDrawer()
    }, 100);
    }
    setLod(false);
  };

  return (
      <Animated.View style={[styles.drawer,{backgroundColor:theme.bg_dark}, animatedDrawerStyle]}>
        <TouchableOpacity style={[styles.closeButton]} onPress={toggleDrawer}>
            <Text style={[styles.closeButtonText,{color:theme.font_dark}]}>X</Text>
          </TouchableOpacity>
        <Formik
          initialValues={{
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            birthday: user.birthday || '',
            mobile: user.mobile || '',
            email: user.email || '',
            gender: user.gender || '',
          }}
          onSubmit={handleEditAccount}
        >
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched }) => (
            <ScrollView contentContainerStyle={styles.scrollView}>
              <Input>الاسم الأول</Input>
              <TextInput
                style={styles.input}
                placeholder="الاسم الأول"
                onChangeText={handleChange('first_name')}
                onBlur={handleBlur('first_name')}
                value={values.first_name}
              />
              {touched.first_name && errors.first_name && <Text style={styles.errorText}>{errors.first_name}</Text>}

              <Input>اسم العائلة</Input>
              <TextInput
                style={styles.input}
                placeholder="اسم العائلة"
                onChangeText={handleChange('last_name')}
                onBlur={handleBlur('last_name')}
                value={values.last_name}
              />
              {touched.last_name && errors.last_name && <Text style={styles.errorText}>{errors.last_name}</Text>}

              <Input>تاريخ الميلاد</Input>
              <TouchableOpacity
                onPress={() => setDatePickerVisibility(true)}
                style={styles.datePickerButton}
              >
                <Text style={styles.datePickerText}>{values.birthday || 'اختر تاريخ الميلاد'}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={(date) => {
                  setDatePickerVisibility(false);
                  setFieldValue('birthday', date.toISOString().split('T')[0]);
                }}
                onCancel={() => setDatePickerVisibility(false)}
                maximumDate={new Date()}
              />
              {touched.birthday && errors.birthday && <Text style={styles.errorText}>{errors.birthday}</Text>}

              <Input>الجنس</Input>
              <View style={styles.genderContainer}>
                <TouchableOpacity
                  style={styles.genderOption}
                  onPress={() => setFieldValue('gender', 'f')}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      values.gender === 'f' && {backgroundColor:theme.light_color,borderColor:theme.font_dark},
                    ]}
                  />
                  <Input>أنثى</Input>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.genderOption}
                  onPress={() => setFieldValue('gender', 'm')}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      values.gender === 'm' && {backgroundColor:theme.light_color,borderColor:theme.font_dark},
                    ]}
                  />
                  <Input>ذكر</Input>
                </TouchableOpacity>
              </View>
              {touched.gender && errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

              <Input>رقم الجوال</Input>
              <TextInput
                style={styles.input}
                placeholder="رقم الجوال"
                onChangeText={handleChange('mobile')}
                onBlur={handleBlur('mobile')}
                value={values.mobile}
              />
              {touched.mobile && errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}

              <Input>البريد الإلكتروني</Input>
              <TextInput
                style={styles.input}
                placeholder="البريد الإلكتروني"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

              <GlobalButton onPress={handleSubmit} loading={lod} title={t("edit")} />
            </ScrollView>
          )}
        </Formik>
      </Animated.View>
    
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: height * 0.9,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
  input: {
    borderWidth: 1,
    backgroundColor:"white",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  datePickerButton: {
    borderWidth: 1,
    backgroundColor:"white",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },
  datePickerText: {
    color: '#333',
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
//   selectedRadio: {
//     borderColor: '#007bff',
//     backgroundColor: '#007bff',
//   },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: 'transparent',
    paddingBottom:20,
    width:60
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default DrawerEditAccount;