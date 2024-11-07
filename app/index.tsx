import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View, Dimensions, Image, StyleSheet, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';

const Index = () => {
  const navigation: any = useNavigation();  

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    'text': require('../assets/fonts/static/Rubik-Regular.ttf'),
    'heading': require('../assets/fonts/static/Rubik-Bold.ttf'),
  });

  // Second useEffect for delayed navigation
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('FirstScreen');
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [navigation]);

  // Loading state if fonts are not loaded
  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
  }

  return (
    <ImageBackground 
      source={require('../assets/images/index.png')} 
      style={styles.background}
      resizeMode="cover"
    >
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
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Index;
