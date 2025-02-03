import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { useNavigation } from 'expo-router';
import AuctionScreen from './AuctionScreen';

// Icon imports
import Insurance from '../assets/images/icon/insurance.png';
import Auction from '../assets/images/icon/Intro.png';
import Calculator from '../assets/images/icon/calculator.png';
import Query from '../assets/images/icon/query.png';

const data = [
  { id: '1', title: 'Insurance', link: 'https://loanguru.in/?page_id=2034', icon: Insurance },
  { id: '2', title: 'Auction', link:'', icon: Auction },
  { id: '3', title: 'EMI Calculator', link: 'https://loanguru.in/?page_id=2041', icon: Calculator },
  { id: '4', title: 'Query', link: 'https://loanguru.in/?page_id=73', icon: Query },
];

const QuickLink = () => {
  const navigation: any = useNavigation();
  const [fontsLoaded] = useFonts({
    'Lato': require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handleNavigation = (item: { link?: string }) => {
    console.log('Navigating to:', item?.link ? item.link : 'AuctionScreen');
    if (item?.link != '') {
      navigation.navigate('WebViewScreen', { uri: item.link });
    } else {
      navigation.navigate('AuctionScreen');
    }
  };

  const renderItem = ({ item }: { item: { id: string; title: string; link?: string; icon: any } }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      key={item.id}
      onPress={() => handleNavigation(item)}
    >
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
    backgroundColor: '#f2f0ef',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  heading: {
    fontFamily: 'Lato',
    fontSize: 14,
    // marginBottom: 20,
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
    marginBottom: 5,
    width: '22%',
  },
  iconContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderColor: '#E3E2E2',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    margin: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
  itemText: {
    fontFamily: 'Lato',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    color: '#1E1E1E',
  },
});

export default QuickLink;
