import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

const AppointmentTypeCheckBox = ({ serviceTypeData, setSelectedserviceId, selectedServiceId }) => {
  const toggleSelection = (id) => {
    setSelectedserviceId((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose Service</Text>
      <FlatList
        data={serviceTypeData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => toggleSelection(item.id)}
            >
              <View
                style={[
                  styles.checkbox,
                  selectedServiceId.includes(item.id) && styles.checkboxSelected,
                ]}
              />
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
            <Text style={styles.priceText}>{item.price} SAR</Text>
          </View>
        )}
        // contentContainerStyle={{ paddingBottom: 20 }} // إضافة هامش داخلي
        showsVerticalScrollIndicator={false} // إخفاء شريط التمرير الرأسي
      />
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
    borderColor: "#6200ee",
    borderRadius: 4,
    marginRight: 10,
  },
  checkboxSelected: {
    backgroundColor: "#6200ee",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  priceText: {
    fontSize: 16,
    color: "#8a8a8a",
  },
});

export default AppointmentTypeCheckBox;
