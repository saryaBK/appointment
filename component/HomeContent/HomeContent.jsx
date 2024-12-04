import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { BranchDetails, BranchName, BranchNote, Card, FindText, ProfileImage, Wrapper } from './styled';
import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import useTheme from '../../context/useTheme/useTheme';

const HomeContent = ({data}) => {
  const {theme} = useTheme();
  const Navigation = useNavigation()

  const handleGoDetails= ({item}) => {
    Navigation.navigate('BranchesDetails', {branch_id:item.id})
  };

  const renderItem = ({ item }) => (
    <Card activeOpacity={0.1}  style={styles.card} onPress={() => handleGoDetails({ item })}>
      {
        item?.image?.file_url ? (
          <ProfileImage source={{ uri: item.image.file_url }} />
        ) : (
          <ProfileImage style={styles.image} source={require('../../assets/empty_image.png')} />
        )
      }
      <BranchDetails>
        {item?.name && <BranchName>{item.name}</BranchName>}
        {item?.notes && <BranchNote>{item.notes}</BranchNote>}
      </BranchDetails>
    </Card>
  );
  
  return (
    <Wrapper style={{paddingTop: theme.mediumSize + 60}}>
      <FindText>{t('find the branch you want')}</FindText>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  list: {
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
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});

export default HomeContent;