

import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Index = () => {

  const navigation: any = useNavigation();  
  useEffect(() => {
    // Navigate to another screen after 10 seconds
    const timer = setTimeout(() => {
      navigation.navigate('FirstScreen'); // Adjust navigation target
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/images/loanguru.png')} // Adjust image path
        style={styles.logo}
        resizeMode="contain"
      />
      
      {/* Secure Icon */}
      <Image
        source={require('../assets/images/secure.png')} // Adjust image path
        style={styles.icon}
        resizeMode="contain"
      />
      
      {/* 100% Secure App Text */}
      <Text style={styles.text}>100% SECURE APP</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // White background
  },
   logo: {
    //  width: ,
    //  height: 100,
     marginTop:'50%',
   },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10, 
    marginTop:'80%',
  },
  text: {
    fontSize: 16,
    color: '#000',
    
  },
});

export default Index;
