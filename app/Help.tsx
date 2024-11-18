import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const data = [
  { id: '1', title: 'Applying issues', icon: 'account-check-outline' },
  { id: '2', title: 'Closer issue', icon: 'lock-check-outline' },
  { id: '3', title: 'Loan issue', icon: 'currency-usd' }
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
    fontSize: 12,
    marginBottom: 20,
    color: '#1E1E1E',
    fontWeight: '700',
    textAlign: 'left',
    lineHeight: 14.4,
    letterSpacing: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  itemContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '33%', // Ensure proper spacing and alignment
  },
  iconContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderColor: '#E3E2E2',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    margin: 10,
  },
  itemText: {
    fontFamily: 'Lato',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
    color: '#1E1E1E',
  },
});

export default Help;
