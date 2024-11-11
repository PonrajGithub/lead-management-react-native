import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import {Image, StyleSheet, ImageBackground } from 'react-native';


const Index = () => {
  const navigation: any = useNavigation();  

  // Second useEffect for delayed navigation
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('FirstScreen');
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [navigation]);


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
    marginVertical:'auto'
  },
});

export default Index;
