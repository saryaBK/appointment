import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const AppointmentTimeBar = ({ dateData, theme, setspecifiedBookingDate, setSelectedTimeId, specifiedBookingDate }) => {
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      >
        {dateData.map((item, index) => {
          const isSelected = selectedTime == item.time;

          return (
            <TouchableOpacity
              key={index.toString()}
              style={[
                styles.itemContainer,
                isSelected && { backgroundColor: theme.dark_color },
              ]}
              onPress={() => {
                setSelectedTime(item.time);
                setspecifiedBookingDate(item.time);
                setSelectedTimeId(item.id);
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
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
    height: 100, // ارتفاع ثابت للحاوية
  },
  itemContainer: {
    padding: 15,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  itemText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AppointmentTimeBar;
