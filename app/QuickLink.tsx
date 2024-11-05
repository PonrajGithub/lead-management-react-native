import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const data = [
  { id: '1', title: 'Calculator' , icon: 'unlock-alt'},
  { id: '2', title: 'Job', icon: 'unlock-alt' },
  { id: '3', title: 'Women Empowerment', icon: 'unlock-alt' },
  { id: '4', title: 'Query', icon: 'unlock-alt' },
  { id: '5', title: 'Insurance', icon: 'unlock-alt' },
  { id: '6', title: 'Health Insurance', icon: 'unlock-alt'}
 
];

const QuickLink = () => {

  const [fontsLoaded] = useFonts({
    'text': require('../assets/fonts/static/Rubik-Regular.ttf'),
    'heading': require('../assets/fonts/static/Rubik-Bold.ttf'), 
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const renderItem = ({ item }: { item: { id: string; title: string; icon: string } }) => (
    <TouchableOpacity style={styles.item}>
      <View style={styles.iconContainer}>
      <FontAwesome5 name={item.icon} size={28} color="#1e3a8a" />
      </View>
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Quick Link</Text>
      <View style={styles.row}>
        {data.slice(0, 3).map(item => renderItem({ item }))}
      </View>
      <View style={styles.row}>
        {data.slice(3, 6).map(item => renderItem({ item }))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    borderRadius:40, 
  },
  heading: {
    fontFamily: 'Rubik-Bold',
    fontSize: 18,
    marginLeft:20,
    marginBottom:10,
    color:'#1e3a8a',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  flatListContent: {
    alignItems: 'center',
    width:'30%'
  },
  item: {
    width: '30%', 
    alignItems: 'center',
  },
  iconContainer: {
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  itemText: {
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    textAlign: 'center',
    color: '#333',
  },
});

export default QuickLink;
