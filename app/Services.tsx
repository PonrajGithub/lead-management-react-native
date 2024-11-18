import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const data = [
    { id: '1', title: 'Legal', icon: 'gavel' }, 
    { id: '2', title: 'Start up Funding', icon: 'cash-multiple' }, 
    { id: '3', title: 'Investors', icon: 'account-cash-outline' }, 
    { id: '4', title: 'Gov. Policies', icon: 'file-document-outline' }, 
  ];

const Services = () => {
  const [fontsLoaded] = useFonts({
    'Lato': require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const renderItem = ({ item }: { item: { id: string; title: string; icon: any } }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        <Icon name={item.icon} size={24} color="#622CFD" />
      </View>
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SERVICES</Text>
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

export default Services;
