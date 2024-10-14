import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Assuming you're using expo for icons

const data = [
  { id: '1', title: 'Calculator' },
  { id: '2', title: 'Job' },
  { id: '3', title: 'Women Empowerment' },
  { id: '4', title: 'Link' },
  { id: '5', title: 'Link' },
  { id: '6', title: 'Link' },
  { id: '7', title: 'Link' },
  { id: '8', title: 'Link' },
];

const QuickLink = () => {
  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <TouchableOpacity style={styles.item}>
      <View style={styles.iconContainer}>
        <FontAwesome5 name="user" size={24} color="white" />
      </View>
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Quick Link</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={4}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    backgroundColor:'#fff',
    borderRadius:30,
    marginBottom:20,
   
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft:20,
    marginTop:20,
    marginBottom: 30,
  },
  row: {
    justifyContent: 'space-around',
  },
  flatListContent: {
    alignItems: 'center',
  },
  item: {
    width: '23%', // Adjust to fit 4 columns
    alignItems: 'center',
    marginBottom: 30,
  },
  iconContainer: {
    backgroundColor: '#6A0DAD', // Purple background
    borderRadius: 20,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default QuickLink;
