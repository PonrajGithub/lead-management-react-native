import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Assuming you're using expo for icons
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

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

  const [fontsLoaded] = useFonts({
    'text': require('../assets/fonts/static/Rubik-Regular.ttf'),
    'heading': require('../assets/fonts/static/Rubik-Bold.ttf'), 
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <TouchableOpacity style={styles.item}>
      <View style={styles.iconContainer}>
        <FontAwesome5 name="user" size={20} color="#1e3a8a" />
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
    padding: 10,
    backgroundColor:'#fff',
    borderRadius:30, 
  },
  heading: {
    fontSize: 18,
    fontFamily:'heading',
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  flatListContent: {
    alignItems: 'center',
  },
  item: {
    width: '22%', 
    alignItems: 'center',
    marginBottom: 20,
    fontFamily:'text',
  },
  iconContainer: {
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    marginTop: 8,
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'text',
    color: '#333',
  },
});

export default QuickLink;
