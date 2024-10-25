import React,{useEffect} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from 'expo-router';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FirstScreen = () => {
  const navigation: any = useNavigation();

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    'text': require('../assets/fonts/static/Rubik-Regular.ttf'),
    'heading': require('../assets/fonts/static/Rubik-Bold.ttf'),
  });

  // Render loading state if fonts are not loaded
  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>; // Show a loading state
  }

  useEffect(() => {
    const checkAppState = async () => {
      if (!fontsLoaded) return; // Ensure fonts are loaded first
  
      try {
        // Check if it's the first launch
        const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');
        if (isFirstLaunch === null) {
          await AsyncStorage.setItem('isFirstLaunch', 'false');
          return; // Handle any first-launch logic here if necessary
        }
  
        // Check if user data exists
        const storedData = await AsyncStorage.getItem('@storage_user_data');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const token = parsedData?.data?.token;
          if (token) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'DashboardScreen' }],
            });
            return;
          }
        }
      } catch (error) {
        console.error('Error checking app state:', error);
      }
    };
  
    if (fontsLoaded) {
      checkAppState(); // Correctly call the function here
    }
  }, [fontsLoaded, navigation]); // Add fontsLoaded to the dependency array
  

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1e3a8a" barStyle="light-content" />

      <Image
        source={require('../assets/images/first.jpg')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Find the Loan You Need</Text>
      <Text style={styles.description}>
        Easily browse through multiple loan options, tailored to your needs. Fast approvals, flexible terms.
      </Text>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '80%',
    height: 250,
    alignSelf: 'center',
    marginTop: '20%',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'heading',
    textAlign: 'center',
    marginTop: 60,
    color: '#1e3a8a',
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
    backgroundColor: 'black',
  },
  nextButton: {
    backgroundColor: '#007AFF',
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
  skip: {
    color: 'black',
  },
});

export default FirstScreen;
