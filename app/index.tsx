import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import {Image, StyleSheet, ImageBackground, Text } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';


const Index = () => {
  const navigation: any = useNavigation(); 
  const [fontsLoaded] = useFonts({
    'Lato': require('../assets/fonts/Lato/Lato-Regular.ttf'),
  }); 

  // Second useEffect for delayed navigation
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('FirstScreen');
    }, 3000); // 5 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [navigation]);
 

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ImageBackground 
      source={require('../assets/images/index.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <Image
       source={require('../assets/images/c.png')}
       style={styles.image}
      //  resizeMode="contain"
       />

       <Text style={styles.text}>Active User: 25000</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  image:{
    alignSelf:'center',
    marginVertical:'auto',
    height:127,
    width:191,
  },
  text:{
    fontSize: 15,
    fontWeight: '300',
    textAlign: 'center',
    color: '#FFFFFF',
    lineHeight:22.59,
    fontFamily: 'Lato',
    marginBottom:10,
  },
});

export default Index;
