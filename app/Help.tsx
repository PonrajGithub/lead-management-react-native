import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const data = [
  
  { id: '1', title: 'Closer issue', icon: 'lock-check-outline' },
  { id: '2', title: 'Loan issue', icon: 'currency-usd' }
];

const Help = () => {
  const [fontsLoaded] = useFonts({
    'Lato': require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const renderItem = ({ item }: { item: { id: string; title: string; icon: string } }) => (
    <TouchableOpacity style={styles.itemContainer} key={item.id}>
      <View style={styles.iconContainer}>
        <Icon name={item.icon} size={24} color="#622CFD" />
      </View>
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>HELP</Text>
      <View style={styles.row}>
        {data.map((item) => renderItem({ item }))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  heading: {
    fontFamily: 'Lato',
    fontSize: 14,
    marginBottom: 20,
    color: '#1E1E1E',
    fontWeight: '900',
    textAlign: 'left',
    lineHeight: 14.4,
    letterSpacing: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderColor: '#E3E2E2', // Light gray border
    borderWidth: 1,
    justifyContent: 'center',
    width: 170,
    height: 60,
  },
  iconContainer: {
    // backgroundColor: '#E7F4FF',
    padding: 10,
    borderRadius: 15,
    height:44,
    width:44, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontFamily:'Lato',
    fontSize: 18,
    marginLeft: 10,
    fontWeight:'600',
    lineHeight:16.8,
    color:"#1E1E1E",
  },
});

export default Help;
