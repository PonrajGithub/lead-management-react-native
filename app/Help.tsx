import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { useNavigation } from 'expo-router';
// Icon imports
import Closer from '../assets/images/icon/Closer.png';
import Loan from '../assets/images/icon/Loan.png';

const data = [
  { id: '1', title: 'Bank issue', link:'https://loanguru.in/?page_id=2058', icon: Closer },
  { id: '2', title: 'Loan issue', link:'https://loanguru.in/?page_id=2060', icon:Loan  },
  
];

const Help = () => {
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
    backgroundColor: '#f2f0ef',
    // backgroundColor:'#FFF',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  heading: {
    fontFamily: 'Lato',
    fontSize: 14,
    margin:10,
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
    height: 70,
  },
  iconContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 15,
    height:44,
    width:44, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
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
