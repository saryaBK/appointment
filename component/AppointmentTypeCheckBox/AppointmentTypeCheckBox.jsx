import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from "react-native";
import useTheme from "../../context/useTheme/useTheme";

const AppointmentTypeCheckBox = ({ serviceTypeData, setSelectedserviceId, selectedServiceId }) => {
  const {theme,toggleTheme} = useTheme();
  const toggleSelection = (id) => {
    setSelectedserviceId((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose Service</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
      {serviceTypeData.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => toggleSelection(item.id)}
          >
            <View
              style={[
                styles.checkbox,
                { borderColor: theme.light },
                selectedServiceId.includes(item.id) && styles.checkboxSelected,
              ]}
            />
            <Text style={[styles.itemText, { color: theme.font_dark }]}>
              {item.name}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.priceText, { color: theme.font_gray }]}>
            {item.price} SAR
          </Text>
        </View>
      ))}
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
   flex:1,
  //  maxHeight:202
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8a8a8a",
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 10,
  },
  checkboxSelected: {
    backgroundColor: "#7551D6",
  },
  itemText: {
    fontSize: 16,
  },
  priceText: {
    fontSize: 16,
    fontWeight:"500"
  },
});

export default AppointmentTypeCheckBox;
