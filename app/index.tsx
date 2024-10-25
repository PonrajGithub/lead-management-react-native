import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View, Dimensions, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

const Index = () => {
  const navigation: any = useNavigation();  

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    'text': require('../assets/fonts/static/Rubik-Regular.ttf'),
    'heading': require('../assets/fonts/static/Rubik-Bold.ttf'),
  });

  // Check app state effect
  useEffect(() => {
    const checkAppState = async () => {
      try {
        // Check if it's the first launch
        const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');
        if (isFirstLaunch === null) {
          return; // Handle the first launch logic here if necessary
        }

        // Check if user data exists
        const storedData = await AsyncStorage.getItem('@storage_user_data');
        if (storedData !== null) {
          const parsedData = JSON.parse(storedData);
          const token = parsedData?.data?.token;
          if (token) {
            // Token exists, navigate to DashboardScreen
            return navigation.reset({
              index: 0,
              routes: [{ name: 'DashboardScreen' }],
            });
          }
        }

        // No token found, navigate to WelcomeScreen
        navigation.reset({
          index: 0,
          routes: [{ name: 'WelcomeScreen' }],
        });

      } catch (error) {
        console.error('Error checking app state:', error);
      }
    };

    // Check if fonts are loaded before executing app state check
    if (fontsLoaded) {
      checkAppState();
    }
  }, [navigation, fontsLoaded]); // Add fontsLoaded to the dependency array

  // Avoid conditionally rendering hooks
  useEffect(() => {
    const timer = setTimeout(() => {
      if (navigation) {  // Ensure navigation is ready
        navigation.navigate('FirstScreen'); // Adjust navigation target
      }
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [navigation]);

  // Render loading state if fonts are not loaded
  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>; // Show a loading state
  }

  return (
    <View style={styles.container}>
      {/* Centered Loan Image */}
      <View style={styles.centerContent}>
        <Image
          source={require('../assets/images/loan.png')} // Adjust image path
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Footer Image (Secure Icon) */}
      <View style={styles.footer}>
        <Image
          source={require('../assets/images/image.png')} // Adjust image path
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
    justifyContent: 'space-between', // Space between the logo and the footer
    alignItems: 'center', // Center items horizontally
    backgroundColor: '#fff',
  },
  centerContent: {
    flex: 1, // Take up available space for the center content
    justifyContent: 'center', // Vertically center the loan image
    alignItems: 'center',
  },
  logo: {
    width: Dimensions.get('window').width * 0.8, // Set the logo to 80% of the screen width
    height: Dimensions.get('window').height * 0.4, // Set the height to 40% of the screen height
  },
  footer: {
    justifyContent: 'flex-end', // Ensure it's pinned to the bottom
    alignItems: 'center',
    paddingBottom: 20, // Optional: Add padding for the footer
  },
  icon: {
    width: 80, // Width of the footer icon
    height: 80, // Height of the footer icon
  },
});

export default Index;
