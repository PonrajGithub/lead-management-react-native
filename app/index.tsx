import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View, Dimensions, Image, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Image
          source={require('../assets/images/loan.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.footer}>
        <Image
          source={require('../assets/images/image.png')}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.4,
  },
  footer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  icon: {
    width: 80,
    height: 80,
  },
});

export default Index;
