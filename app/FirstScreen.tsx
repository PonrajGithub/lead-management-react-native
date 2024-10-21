import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

const FirstScreen = ({ }: any) => {
    const navigation: any = useNavigation();

    // Loading custom fonts
    const [fontsLoaded] = useFonts({
      'text': require('../assets/fonts/static/Rubik-Regular.ttf'),
      'heading': require('../assets/fonts/static/Rubik-Bold.ttf'), 
    });

    useEffect(() => {
      const checkAppState = async () => {
        try {
          // Check if it's the first launch
          const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');
          if (isFirstLaunch === null) {
            return;
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

      // Execute app state check
      checkAppState();
    }, [navigation]);

    // Loading state for fonts
    if (!fontsLoaded) {
      return null; // Return null for the loading state to avoid re-render issues
    }

  //   useEffect(  () => {
  //   const checkUserData = async () => {
  //     try {
  //       const storedData = await AsyncStorage.getItem('@storage_user_data');
  //       if (storedData !== null) {
  //         const parsedData = JSON.parse(storedData);

  //         const token = parsedData?.data?.token; // Assuming you are storing a token
  //         console.log(token);
  //         if (token) {
  //           return navigation.reset({
  //             index: 0,
  //             routes: [{ name: 'DashboardScreen' }],
  //           });
             
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error reading AsyncStorage:', error);
  //     }
  //   };

  //   checkUserData();
  // })
    
  return (
    <View style={styles.container}>
      {/* Status bar and header */}
      <StatusBar backgroundColor="#6A1B9B" barStyle="light-content" />

      {/* Image */}
      <Image
        source={require('../assets/images/first.jpg')} // Replace with your image path
        style={styles.image}
        resizeMode="contain"
      />

      {/* Title and description */}
      <Text style={styles.title}>Find the Loan You Need</Text>
      <Text style={styles.description}>
        Easily browse through multiple loan options, tailored to your needs. Fast approvals, flexible terms.
      </Text>

      {/* Pagination and buttons */}
      <View style={styles.footer}>
      {/* Pagination dots */}
      <View style={styles.pagination}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* Next button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('SecondScreen')}
      >
        <Text style={styles.nextButtonText}>NEXT</Text>
      </TouchableOpacity>

      <TouchableOpacity
      
        onPress={() => navigation.navigate('WelcomeScreen')}
      >
        <Text style={styles.skip}>Skip</Text>
      </TouchableOpacity>

    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#6A1B9B', // Purple background for header
  },
  image: {
    width: '80%',
    height: 250,
    alignSelf: 'center',
   marginTop:'20%'
  },
  title: {
    fontSize: 24, 
    fontWeight: '600', 
    fontFamily: 'heading', 
    textAlign: 'center',
    marginTop: 60,
    lineHeight: 32, 
  },
  description: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'text', 
    color: '#555', 
    marginHorizontal: 40,
    marginTop: 10,
    lineHeight: 24, 
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: '10%',
    paddingHorizontal: 50,
    backgroundColor: '#fff',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C4C4C4',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 16,
    height: 9,
    borderRadius: 4,
    backgroundColor: 'black', // Active dot color
  },
  nextButton: {
    backgroundColor: '#007AFF', // Button blue color
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  skip:{
    color:'black'
  }
});


export default FirstScreen;


