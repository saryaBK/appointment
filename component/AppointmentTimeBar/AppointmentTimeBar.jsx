import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const AppointmentTimeBar = ({dateData,theme,setspecifiedBookingDate}) => {
  const [selectedTime, setSelectedTime] = useState(null);

  const renderItem = ({ item }) => {
    const isSelected = selectedTime == item.time;
    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          isSelected && { backgroundColor: theme.dark_color },
        ]}
        onPress={() => {
            setSelectedTime(item.time)
            setspecifiedBookingDate(item.time)
        }}
      >
        <Text
          style={[
            styles.itemText,
            { color: isSelected ? theme.white_color : theme.dark_color },
          ]}
        >
          {item.time.substring(0, 5)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={dateData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
    // paddingHorizontal: 15,
    height:100
  },
  itemContainer: {
    padding: 15,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
  },
  itemText: {
    fontWeight:'bold'
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AppointmentTimeBar;
