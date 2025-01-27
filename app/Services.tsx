import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { useNavigation } from 'expo-router';

// Icon imports
import Legal from '../assets/images/icon/Legal.png';
import Start from '../assets/images/icon/Start.png';
import Investors from '../assets/images/icon/Investors.png';
import Gov from '../assets/images/icon/Gov.png';

const data = [
    { id: '1', title: 'Legal Services', link :'https://loanguru.in/?page_id=2052', icon: Legal }, 
    { id: '2', title: 'Start up Funding', link :'https://loanguru.in/?page_id=2054', icon: Start  }, 
    { id: '3', title: 'Subsidy Schemes', link :'https://loanguru.in/?page_id=2056', icon: Investors }, 
    { id: '4', title: 'Gov. Policies', link:'https://loanguru.in/?page_id=2265',  icon: Gov }, 
  ];

const Services = () => {
  const navigation:any = useNavigation();
  const [fontsLoaded] = useFonts({
    'Lato': require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const renderItem = ({ item }: { item: { id: string; title: string; link: string; icon: any } }) => (
    <TouchableOpacity style={styles.itemContainer} key={item.id} onPress={() => navigation.navigate('WebViewScreen', { uri: item.link })}>
      <View style={styles.iconContainer}>
      <Image source={item.icon} style={styles.icon} />
      </View>
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SERVICES</Text>
      <View style={styles.row}>
        {data.map((item) => (
          renderItem({ item })
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  heading: {
    fontFamily: 'Lato',
    fontSize: 14,
    marginBottom: 10,
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
    borderColor: '#000', 
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

export default Services;
