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

const MyAppointmentsContent = ({data}) => {
  const modalizeRef = useRef(null);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const { lang } = useLanguage();
  const queryClient = useQueryClient()
  console.log(selectedItem)

  const openBottomSheet = (item) => {
    setSelectedItem(item);
    modalizeRef.current?.open();
  };

  // وظائف الخيارات
  const handleEdit = () => {
    // console.log('Edit:', selectedItem);
    modalizeRef.current?.close();
  };

  const handleDelete = async () => {
    const res =  await Delete_appointment(selectedItem.id)
    if(res && res.data){
      queryClient.invalidateQueries({ queryKey: ['customer-appointment', lang] });
      modalizeRef.current?.close();
    }
  };

  // تصميم بطاقة المواعيد
  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={{ uri: item?.employee?.photo?.file_url }} style={styles.profileImage} />
        <View style={styles.details}>
          <Text style={styles.name}>{item?.employee?.branch?.name}</Text>
          <Text style={styles.email}>{item?.employee?.email}</Text>
          <Text style={styles.branch}>{item.branch}</Text>
          <Text style={styles.time}>{item.time}</Text>
          <Text style={styles.time}>{item.date}</Text>
          <Text style={styles.type}>{item.type}</Text>
        </View>
        <TouchableOpacity onPress={() => openBottomSheet(item)}>
          <AntDesign name="ellipsis1" size={20} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Appointments</Text>
      <FlatList
        data={data}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      {/* القائمة السفلى */}
      <Modalize ref={modalizeRef} adjustToContentHeight>
        <View style={styles.bottomSheet}>
          <TouchableOpacity style={styles.actionButton} onPress={handleEdit}>
            <AntDesign name="edit" size={20} color="black" />
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
            <AntDesign name="delete" size={20} color="red" />
            <Text style={[styles.actionText, { color: 'red' }]}>Delete</Text>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c2c5c',
  },
  list: {
    paddingBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
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
    width: 50,
    height: 50,
    borderRadius: 25,
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
    padding: 20,
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
});

export default MyAppointmentsContent;
