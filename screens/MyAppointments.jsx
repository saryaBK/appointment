import React, { useState } from 'react';
import MyAppointmentsContent from '../component/MyAppointmentsContent/MyAppointmentsContent';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const MyAppointments = () => {
  
  

  return (
    <GestureHandlerRootView style={styles.container}>
    <MyAppointmentsContent/>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default MyAppointments;
