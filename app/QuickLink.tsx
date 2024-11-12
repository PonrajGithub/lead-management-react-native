import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Updated import
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const data = [ 
  { id: '1', title: 'Insurance', icon: 'file-document-outline' },
  { id: '2', title: 'Job', icon: 'briefcase-outline' },
  { id: '3', title: 'Calculator', icon: 'calculator-variant' },
  { id: '4', title: 'Query', icon: 'comment-question-outline' },
];

const QuickLink = () => {

  const [fontsLoaded] = useFonts({
    Lato: require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const renderItem = ({ item }: { item: { id: string; title: string; icon: string } }) => (
    <TouchableOpacity style={styles.item}>
      <View style={styles.iconContainer}>
      <Icon name={item.icon} size={30}  color="#622CFD" />
      </View>

      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Quick Link</Text>
      <View style={styles.row}>
        {data.slice(0,4).map(item => renderItem({ item }))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontFamily: 'Lato',
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
  },
  item: { 
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
  },
  iconContainer: {
    backgroundColor: '#E7F4FF',
    padding: 10,
    borderRadius: 20, 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemText: {
    fontFamily:'Lato',
    fontSize: 16,
    marginLeft: 10,
    fontWeight:'600',
    lineHeight:16.8,
    color:"#1E1E1E",
  },
});

export default QuickLink;
