

import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Index = () => {

  const navigation: any = useNavigation();  
  useEffect(() => {
    // Navigate to another screen after 10 seconds
    const timer = setTimeout(() => {
      navigation.navigate('FirstScreen'); // Adjust navigation target
    }, 5000); // 10 seconds

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/images/loan.jpg')} // Adjust image path
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
    width: 200,
    height: 100,
    marginBottom: 20, // Add some space between logo and the icon
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10, // Space between icon and text
  },
  text: {
    fontSize: 16,
    color: '#000', // Black color for text
  },
});

export default Index;
