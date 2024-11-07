import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, StatusBar } from 'react-native';
import { useNavigation } from 'expo-router';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const CongratsScreen = () =>  {
    const navigation: any = useNavigation();

    const [fontsLoaded] = useFonts({
      'text': require('../assets/fonts/static/Rubik-Regular.ttf'),
      'heading': require('../assets/fonts/static/Rubik-Bold.ttf'), 
    });
  
   
  useEffect(() => {
    // Navigate to Dashboard after 10 seconds
    const timer = setTimeout(() => {
      navigation.navigate('LoginScreen');
    }, 5000); 

    // Clean up the timer on unmount
    return () => clearTimeout(timer);
  }, [navigation]);
  
  if (!fontsLoaded) {
    return null; // Return null for the loading state to avoid re-render issues
  }

  return (
    <SafeAreaView style={styles.container}>
         <StatusBar backgroundColor="#1e3a8a" barStyle="light-content" />
      <View style={styles.content}>
        {/* Checkmark Icon */}
        <Image 
          style={styles.icon} 
          source={require('../assets/images/2.png')}
        />
        
        {/* Heading */}
        <Text style={styles.heading}>Congratulations!</Text>
        
        {/* Description */}
        <Text style={styles.description}>
          We’re excited to have you onboard. Now you can explore tailored loan options and
           enjoy seamless financial support. Let’s get started on achieving your goals!
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    width: 120,
    height: 100,
    marginBottom: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    fontFamily:'heading',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6b6b6b',
    lineHeight: 24,
    fontFamily:'text',
  },
});

export default CongratsScreen;
