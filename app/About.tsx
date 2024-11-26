import React from 'react';
import { View, Text, StyleSheet, FlatList,Image, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { useNavigation } from 'expo-router';

// Icon imports
import Intro from '../assets/images/icon/Intro.png';
import Team from '../assets/images/icon/Team.png';
import Media from '../assets/images/icon/Media.png';
import Email from '../assets/images/icon/Email.png';
import DGNMES from '../assets/images/icon/DGNMES.png';
import Privacy from '../assets/images/icon/Privacy.png';
import TC from '../assets/images/icon/TC.png';
import List from '../assets/images/icon/List.png';

const data = [
  { id: '1', name: 'Intro', link:'https://loanguru.in/?page_id=2045', icon: Intro },
  { id: '2', name: 'Team', link:'https://loanguru.in/?page_id=632' ,icon: Team },
  { id: '3', name: 'Media', link:'https://loanguru.in/?page_id=601' ,icon: Media },
  { id: '4', name: 'Email', link:'https://loanguru.in/?page_id=73' ,icon: Email },
  { id: '5', name: 'DGNMES', link:'https://loanguru.in/?page_id=2047' ,icon: DGNMES },
  { id: '6', name: 'Privacy Policy', link:'https://loanguru.in/?page_id=3' ,icon: Privacy },
  { id: '7', name: 'T&C', link:'https://loanguru.in/?page_id=2050' ,icon: TC },
  { id: '8', name: 'List', link:'https://loanguru.in/?page_id=1528', icon: List },
];

const About = () => {
  const navigation: any = useNavigation();
  const [fontsLoaded] = useFonts({
    Lato: require('../assets/fonts/Lato/Lato-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const renderItem = ({ item }: { item: { id: string; name: string; link: string, icon: any} }) => (
    <TouchableOpacity style={styles.gridItem} key={item.id} onPress={() => navigation.navigate('WebViewScreen',{ uri : item.link })}>
      <View style={styles.iconContainer}>
      <Image source={item.icon} style={styles.icon} />
      </View>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>KNOW MORE ABOUT US</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => renderItem({ item })}
        keyExtractor={(item) => item.id}
        numColumns={4}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  header: {
    fontFamily: 'Lato',
    fontSize: 14,
    margin: 20,
    color: '#1E1E1E',
    fontWeight: '900',
    textAlign: 'left',
    lineHeight: 14.4,
    letterSpacing: 2,
  },
  grid: {
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal:10,
  },
  gridItem: {
    alignItems: 'center',
    marginBottom: 20,
    width: '24%',
  },
  iconContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderColor: '#E3E2E2',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    margin: 10,
  },
  icon:{
    height:24,
    width:24,
  },
  itemText: {
    fontFamily: 'Lato',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
    lineHeight: 16.8,
    color: '#1E1E1E',
  },
});

export default About;
