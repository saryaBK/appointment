import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import { Delete_appointment } from '../../apiMethods/apiCall/del';
import { useQueryClient } from '@tanstack/react-query';
import { useLanguage } from '../../context/useLang/useLang';
import useTheme from '../../context/useTheme/useTheme';
import * as Animatable from 'react-native-animatable';
import { formatDate } from '../FormatDateFunc/FormatDateFunc';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const MyAppointmentsContent = ({ data }) => {
  const modalizeRef = useRef(null);
  const { theme } = useTheme();
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const { lang } = useLanguage();
  const queryClient = useQueryClient();

  const openBottomSheet = (item) => {
    setSelectedItem(item);
    modalizeRef.current?.open();
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await Delete_appointment(selectedItem.id);
      if (res && res.data) {
        queryClient.invalidateQueries({ queryKey: ['customer-appointment', lang] });
        modalizeRef.current?.close();
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const renderCard = ({ item }) =>{ 
    return(
      <View style={{gap:20}}>
        <Text style={{color:theme.font_dark,fontWeight:"bold",fontSize:16}}>{formatDate(item?.date)}</Text>
        <View style={[styles.card,{backgroundColor:theme.bg_light}]}>
          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <Image source={{ uri: item?.employee?.photo?.file_url }} style={styles.profileImage} />
          <View style={{flexDirection:"column"}}>
          <Text style={{width:200,color:theme.light,fontWeight:"bold",fontSize:16,color:theme.light_color}}>{item?.employee?.name}</Text>
          <Text style={{width:200,color:theme.font_gray}}>{item?.employee?.email}</Text>
          </View>
          <TouchableOpacity style={[styles.icon]} onPress={() => openBottomSheet(item)}>
            <FontAwesome6 onPress={() => openBottomSheet(item)} name="ellipsis-vertical" size={24} color="gray" />
          </TouchableOpacity>
          </View>
          <Text style={{fontSize:15,fontWeight:"bold"}}>{item?.employee?.branch?.name}</Text>
          <Text style={{fontSize:15,fontWeight:"bold"}}>{item.time}</Text>
        </View>
      </View>
  )};

  return (
    <View style={[styles.container, { paddingTop: theme.mediumSize + 40,paddingHorizontal:25}]}>
      <Text style={[styles.header,{color:theme.font_dark}]}>My Appointments</Text>
      <FlatList
        data={data}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
      <Modalize ref={modalizeRef} adjustToContentHeight>
        <View style={styles.bottomSheet}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleDelete}
            disabled={isDeleting} 
          >
            <Animatable.View
              animation={isDeleting ? 'rotate' : undefined}
              duration={1000}
              iterationCount="infinite"
            >
              <AntDesign name="delete" size={20} color={isDeleting ? 'orange' : 'red'} />
            </Animatable.View>
            <Text style={[styles.actionText, { color: isDeleting ? 'orange' : 'red' }]}>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 10,
  },
  card: {
    padding: 15,
    gap:10,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8b58fc',
  },
  email: {
    fontSize: 12,
    color: 'gray',
  },
  branch: {
    fontSize: 14,
    color: '#2c2c5c',
  },
  time: {
    fontSize: 14,
    color: 'gray',
  },
  type: {
    fontSize: 14,
    color: 'gray',
  },
  bottomSheet: {
    paddingHorizontal: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  icon:{
    alignItems:'flex-end',
    width:25,
  }
});

export default MyAppointmentsContent;
