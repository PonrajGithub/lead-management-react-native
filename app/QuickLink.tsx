import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Updated import
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const data = [
  { id: '1', title: 'Calculator', icon: 'calculator-variant' },
  { id: '2', title: 'Job', icon: 'briefcase-outline' },
  { id: '3', title: 'Women Empowerment', icon: 'human-female' },
  { id: '4', title: 'Query', icon: 'comment-question-outline' },
  { id: '5', title: 'Insurance', icon: 'shield-outline' },
  { id: '6', title: 'Health Insurance', icon: 'medical-bag' }
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
      <Icon name={item.icon} size={28} color="#fff" />
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
    color:'#333333',
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
    padding: 10,
    borderRadius: 15,
  },
  iconContainer: {
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    // borderWidth: 2,
    // borderColor: '#FF4C4C',
    backgroundColor: '#0096FF',
  },
  itemText: {
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    textAlign: 'center',
    color: '#333333',
  },
});

export default QuickLink;
