import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Dimensions, TouchableOpacity, TouchableWithoutFeedback, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { t } from "i18next";
import useTheme from '../../context/useTheme/useTheme';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { BranchDetails, BranchName, BranchNote, Card, FindText, ProfileImage, Wrapper } from './styled';

const { height } = Dimensions.get('window');

const HomeContent = ({ data }) => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const translateY = useSharedValue(-height);

  const toggleDrawer = () => {
    translateY.value = translateY.value === 0 ? -height : 0;
  };

  const closeDrawer = () => {
    translateY.value = -height;
  };

  const filteredBranches = useMemo(() => {
    if (!searchText) {
      return data || [];
    }
    return data?.filter((item) =>
      item?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      item?.notes?.toLowerCase().includes(searchText.toLowerCase())
    ) || [];
  }, [searchText, data]);

  const handleGoDetails = ({ item }) => {
    navigation.navigate('BranchesDetails', { branch_id: item.id });
  };

  const renderItem = ({ item }) => (
    <Card activeOpacity={0.1} style={styles.card} onPress={() => handleGoDetails({ item })}>
      {item?.image?.file_url ? (
        <ProfileImage source={{ uri: item.image.file_url }} />
      ) : (
        <ProfileImage style={styles.image} source={require('../../assets/empty_image.png')} />
      )}
      <BranchDetails>
        {item?.name && <BranchName>{item.name}</BranchName>}
        {item?.notes && <BranchNote>{item.notes}</BranchNote>}
      </BranchDetails>
    </Card>
  );

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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <FindText>{t('find the branch you want')}</FindText>
            <Ionicons onPress={toggleDrawer} name="search" size={24} color={theme.light} />
          </View>

          <FlatList
            data={filteredBranches}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
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
  list: {
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    shadowColor: 'rgba(44, 44, 92, 1)',
    elevation: 10,
  },
  card: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
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

export default HomeContent;
