import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

// Icon imports
import Insurance from '../assets/images/icon/insurance.png';
import Job from '../assets/images/icon/job.png';
import Calculator from '../assets/images/icon/calculator.png';
import Query from '../assets/images/icon/query.png';

const data = [
  { id: '1', title: 'Insurance', icon: Insurance },
  { id: '2', title: 'Job', icon: Job },
  { id: '3', title: 'EMI Calculator', icon: Calculator },
  { id: '4', title: 'Query', icon: Query },
];

const QuickLink = () => {
  const [fontsLoaded] = useFonts({
    'Lato': require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const renderItem = ({ item }: { item: { id: string; title: string; icon: any } }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        <Image source={item.icon} style={styles.icon} />
      </View>
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>QUICK LINKS</Text>
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
    lineHeight:14.4,
    letterSpacing:2
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  itemContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '22%', // Ensure proper spacing and alignment
  },
  iconContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderColor: '#E3E2E2', // Light gray border
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    margin: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  itemText: {
    fontFamily: 'Lato',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
    color: '#1E1E1E',
  },
});

export default QuickLink;
